import { db, getDb, memoryStore, withoutId, nextId } from '../db.js';

export async function createConsultation(req, res) {
  try {
    const {
      devotee_name,
      phone,
      email,
      dob,
      tob,
      pob,
      consultation_type,
      partner_name,
      partner_dob,
      partner_tob,
      partner_pob,
      query
    } = req.body;

    if (!devotee_name || !phone || !dob || !tob || !pob || !consultation_type) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, date of birth, time of birth, place of birth, and consultation type are required.'
      });
    }

    const connected = db.state.connected;
    const record = {
      id: connected ? await nextId('consultations') : memoryStore.consultations.length + 1,
      devotee_name,
      phone,
      email: email || '',
      dob,
      tob,
      pob,
      consultation_type,
      partner_name: partner_name || null,
      partner_dob: partner_dob || null,
      partner_tob: partner_tob || null,
      partner_pob: partner_pob || null,
      query: query || '',
      status: 'new',
      created_at: connected ? new Date() : new Date().toISOString()
    };

    if (connected) {
      await getDb().collection('consultations').insertOne(record);
    } else {
      memoryStore.consultations.unshift(record);
    }

    return res.status(201).json({
      success: true,
      message: 'ज्योतिष एवं रत्न परामर्श अनुरोध दर्ज कर लिया गया है।',
      data: withoutId(record)
    });
  } catch (error) {
    console.error('Error creating consultation:', error);
    return res.status(500).json({ success: false, message: 'Server error processing consultation request' });
  }
}

export async function getConsultations(req, res) {
  try {
    const { status, type } = req.query;

    if (db.state.connected) {
      const filter = {};
      if (typeof status === 'string' && status && status !== 'all') {
        filter.status = status;
      }
      if (typeof type === 'string' && type && type !== 'all') {
        filter.consultation_type = type;
      }
      const data = await getDb()
        .collection('consultations')
        .find(filter, { projection: { _id: 0 } })
        .sort({ created_at: -1 })
        .toArray();
      return res.json({ success: true, count: data.length, data });
    }

    let data = [...memoryStore.consultations];
    if (status && status !== 'all') {
      data = data.filter(c => c.status === status);
    }
    if (type && type !== 'all') {
      data = data.filter(c => c.consultation_type === type);
    }
    return res.json({ success: true, count: data.length, data });
  } catch (error) {
    console.error('Error fetching consultations:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching consultations' });
  }
}

export async function updateConsultationStatus(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;

    if (db.state.connected) {
      const updated = await getDb()
        .collection('consultations')
        .findOneAndUpdate(
          { id },
          { $set: { status: typeof status === 'string' ? status : null } },
          { returnDocument: 'after', projection: { _id: 0 } }
        );
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Consultation not found' });
      }
      return res.json({ success: true, data: updated });
    }

    const item = memoryStore.consultations.find(c => c.id === id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Consultation not found' });
    }
    item.status = status;
    return res.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating consultation:', error);
    return res.status(500).json({ success: false, message: 'Server error updating consultation' });
  }
}
