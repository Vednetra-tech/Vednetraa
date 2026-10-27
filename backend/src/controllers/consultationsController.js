import { pool, isPostgresConnected, memoryStore } from '../config/db.js';

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

    if (isPostgresConnected) {
      const q = `
        INSERT INTO consultations (
          devotee_name, phone, email, dob, tob, pob, consultation_type,
          partner_name, partner_dob, partner_tob, partner_pob, query, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'new')
        RETURNING *;
      `;
      const values = [
        devotee_name, phone, email || '', dob, tob, pob, consultation_type,
        partner_name || null, partner_dob || null, partner_tob || null, partner_pob || null,
        query || ''
      ];
      const result = await pool.query(q, values);
      return res.status(201).json({
        success: true,
        message: 'ज्योतिष एवं रत्न परामर्श अनुरोध दर्ज कर लिया गया है।',
        data: result.rows[0]
      });
    } else {
      const newConsultation = {
        id: memoryStore.consultations.length + 1,
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
        created_at: new Date().toISOString()
      };
      memoryStore.consultations.unshift(newConsultation);
      return res.status(201).json({
        success: true,
        message: 'ज्योतिष एवं रत्न परामर्श अनुरोध दर्ज कर लिया गया है।',
        data: newConsultation
      });
    }
  } catch (error) {
    console.error('Error creating consultation:', error);
    res.status(500).json({ success: false, message: 'Server error processing consultation request' });
  }
}

export async function getConsultations(req, res) {
  try {
    const { status, type } = req.query;

    if (isPostgresConnected) {
      let q = 'SELECT * FROM consultations WHERE 1=1';
      const params = [];

      if (status && status !== 'all') {
        params.push(status);
        q += ` AND status = $${params.length}`;
      }

      if (type && type !== 'all') {
        params.push(type);
        q += ` AND consultation_type = $${params.length}`;
      }

      q += ' ORDER BY created_at DESC';
      const result = await pool.query(q, params);
      return res.json({ success: true, count: result.rows.length, data: result.rows });
    } else {
      let data = [...memoryStore.consultations];
      if (status && status !== 'all') {
        data = data.filter(c => c.status === status);
      }
      if (type && type !== 'all') {
        data = data.filter(c => c.consultation_type === type);
      }
      return res.json({ success: true, count: data.length, data });
    }
  } catch (error) {
    console.error('Error fetching consultations:', error);
    res.status(500).json({ success: false, message: 'Server error fetching consultations' });
  }
}

export async function updateConsultationStatus(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;

    if (isPostgresConnected) {
      const result = await pool.query(
        'UPDATE consultations SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Consultation not found' });
      }
      return res.json({ success: true, data: result.rows[0] });
    } else {
      const item = memoryStore.consultations.find(c => c.id === id);
      if (!item) {
        return res.status(404).json({ success: false, message: 'Consultation not found' });
      }
      item.status = status;
      return res.json({ success: true, data: item });
    }
  } catch (error) {
    console.error('Error updating consultation:', error);
    res.status(500).json({ success: false, message: 'Server error updating consultation' });
  }
}
