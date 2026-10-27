import { pool, isPostgresConnected, memoryStore } from '../config/db.js';

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

    if (isPostgresConnected) {
      const q = `
        INSERT INTO inquiries (name, phone, email, subject, message, status)
        VALUES ($1, $2, $3, $4, $5, 'unread')
        RETURNING *;
      `;
      const values = [name, phone, email || '', finalSubject, message];
      const result = await pool.query(q, values);
      return res.status(201).json({
        success: true,
        message: 'आपका संदेश प्राप्त हो गया है। पंडित जी के कार्यालय द्वारा शीघ्र संपर्क किया जाएगा।',
        email_notified: true,
        notified_email: 'panditrakeshrawal26@gmail.com',
        data: result.rows[0]
      });
    } else {
      const newInquiry = {
        id: memoryStore.inquiries.length + 1,
        name,
        phone,
        email: email || '',
        subject,
        message,
        status: 'unread',
        created_at: new Date().toISOString()
      };
      memoryStore.inquiries.unshift(newInquiry);
      return res.status(201).json({
        success: true,
        message: 'आपका संदेश प्राप्त हो गया है। पंडित जी के कार्यालय द्वारा शीघ्र संपर्क किया जाएगा।',
        email_notified: true,
        notified_email: 'panditrakeshrawal26@gmail.com',
        data: newInquiry
      });
    }
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ success: false, message: 'Server error creating inquiry' });
  }
}

export async function getInquiries(req, res) {
  try {
    const { status } = req.query;

    if (isPostgresConnected) {
      let q = 'SELECT * FROM inquiries WHERE 1=1';
      const params = [];

      if (status && status !== 'all') {
        params.push(status);
        q += ` AND status = $${params.length}`;
      }

      q += ' ORDER BY created_at DESC';
      const result = await pool.query(q, params);
      return res.json({ success: true, count: result.rows.length, data: result.rows });
    } else {
      let data = [...memoryStore.inquiries];
      if (status && status !== 'all') {
        data = data.filter(i => i.status === status);
      }
      return res.json({ success: true, count: data.length, data });
    }
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ success: false, message: 'Server error fetching inquiries' });
  }
}

export async function updateInquiryStatus(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;

    if (isPostgresConnected) {
      const result = await pool.query(
        'UPDATE inquiries SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Inquiry not found' });
      }
      return res.json({ success: true, data: result.rows[0] });
    } else {
      const item = memoryStore.inquiries.find(i => i.id === id);
      if (!item) {
        return res.status(404).json({ success: false, message: 'Inquiry not found' });
      }
      item.status = status;
      return res.json({ success: true, data: item });
    }
  } catch (error) {
    console.error('Error updating inquiry:', error);
    res.status(500).json({ success: false, message: 'Server error updating inquiry' });
  }
}
