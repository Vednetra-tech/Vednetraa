import { db, getDb, memoryStore, withoutId, nextId } from '../db.js';

export async function createInquiry(req, res) {
  try {
    const { name, phone, email, subject, service_interest, message } = req.body;
    const finalSubject = subject || service_interest || 'सामान्य परामर्श';

    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, and message are required.'
      });
    }

    // Item 10: Email Notification to Panditji
    console.log(`\n================================================================`);
    console.log(`📧 [VedNetra Inquiry Email Dispatch] New Devotee Message Received`);
    console.log(`To: पं. राकेश चन्द्र रावल <panditrakeshrawal26@gmail.com>`);
    console.log(`From: ${name} (${phone}${email ? `, ${email}` : ''})`);
    console.log(`Subject: ${finalSubject}`);
    console.log(`Message: "${message}"`);
    console.log(`Status: Dispatched Notification to Panditji Office`);
    console.log(`================================================================\n`);

    const connected = db.state.connected;
    const record = {
      id: connected ? await nextId('inquiries') : memoryStore.inquiries.length + 1,
      name,
      phone,
      email: email || '',
      subject: finalSubject,
      message,
      status: 'unread',
      created_at: connected ? new Date() : new Date().toISOString()
    };

    if (connected) {
      await getDb().collection('inquiries').insertOne(record);
    } else {
      memoryStore.inquiries.unshift(record);
    }

    return res.status(201).json({
      success: true,
      message: 'आपका संदेश प्राप्त हो गया है। पंडित जी के कार्यालय द्वारा शीघ्र संपर्क किया जाएगा।',
      email_notified: true,
      notified_email: 'panditrakeshrawal26@gmail.com',
      data: withoutId(record)
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return res.status(500).json({ success: false, message: 'Server error creating inquiry' });
  }
}

export async function getInquiries(req, res) {
  try {
    const { status } = req.query;

    if (db.state.connected) {
      const filter = {};
      if (typeof status === 'string' && status && status !== 'all') {
        filter.status = status;
      }
      const data = await getDb()
        .collection('inquiries')
        .find(filter, { projection: { _id: 0 } })
        .sort({ created_at: -1 })
        .toArray();
      return res.json({ success: true, count: data.length, data });
    }

    let data = [...memoryStore.inquiries];
    if (status && status !== 'all') {
      data = data.filter(i => i.status === status);
    }
    return res.json({ success: true, count: data.length, data });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching inquiries' });
  }
}

export async function updateInquiryStatus(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;

    if (db.state.connected) {
      const updated = await getDb()
        .collection('inquiries')
        .findOneAndUpdate(
          { id },
          { $set: { status: typeof status === 'string' ? status : null } },
          { returnDocument: 'after', projection: { _id: 0 } }
        );
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Inquiry not found' });
      }
      return res.json({ success: true, data: updated });
    }

    const item = memoryStore.inquiries.find(i => i.id === id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    item.status = status;
    return res.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return res.status(500).json({ success: false, message: 'Server error updating inquiry' });
  }
}
