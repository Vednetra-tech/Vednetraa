import { pool, isPostgresConnected, memoryStore } from '../config/db.js';

export async function createBooking(req, res) {
  try {
    const {
      devotee_name,
      phone,
      email,
      service_id,
      service_title,
      ritual_mode,
      preferred_date,
      second_date,
      third_date,
      preferred_time,
      gotra,
      nakshatra,
      rashi,
      venue_address,
      city,
      special_sankalp,
      terms_accepted
    } = req.body;

    if (!devotee_name || !phone || !service_title || !ritual_mode || !preferred_date) {
      return res.status(400).json({
        success: false,
        message: 'Devotee name, phone, service title, ritual mode, and preferred date are required.'
      });
    }

    if (isPostgresConnected) {
      const query = `
        INSERT INTO bookings (
          devotee_name, phone, email, service_id, service_title, ritual_mode,
          preferred_date, second_date, third_date, preferred_time, gotra, nakshatra, rashi,
          venue_address, city, special_sankalp, terms_accepted, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, 'pending')
        RETURNING *;
      `;
      const values = [
        devotee_name, phone, email || '', service_id || null, service_title, ritual_mode,
        preferred_date, second_date || null, third_date || null, preferred_time || '', gotra || '', nakshatra || '', rashi || '',
        venue_address || '', city || '', special_sankalp || '', terms_accepted !== undefined ? terms_accepted : true
      ];

      const result = await pool.query(query, values);
      return res.status(201).json({
        success: true,
        message: 'सङ्कल्प एवं पूजा आरक्षण सफलतापूर्वक दर्ज किया गया।',
        data: result.rows[0]
      });
    } else {
      // Memory store
      const newBooking = {
        id: memoryStore.bookings.length + 1,
        devotee_name,
        phone,
        email: email || '',
        service_id: service_id || null,
        service_title,
        ritual_mode,
        preferred_date,
        second_date: second_date || null,
        third_date: third_date || null,
        preferred_time: preferred_time || '',
        gotra: gotra || '',
        nakshatra: nakshatra || '',
        rashi: rashi || '',
        venue_address: venue_address || '',
        city: city || '',
        special_sankalp: special_sankalp || '',
        terms_accepted: terms_accepted !== undefined ? terms_accepted : true,
        status: 'pending',
        created_at: new Date().toISOString()
      };
      memoryStore.bookings.unshift(newBooking);
      return res.status(201).json({
        success: true,
        message: 'सङ्कल्प एवं पूजा आरक्षण सफलतापूर्वक दर्ज किया गया।',
        data: newBooking
      });
    }
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ success: false, message: 'Server error processing booking request' });
  }
}

export async function getBookings(req, res) {
  try {
    const { status, search } = req.query;

    if (isPostgresConnected) {
      let query = 'SELECT * FROM bookings WHERE 1=1';
      const params = [];

      if (status && status !== 'all') {
        params.push(status);
        query += ` AND status = $${params.length}`;
      }

      if (search) {
        params.push(`%${search}%`);
        query += ` AND (devotee_name ILIKE $${params.length} OR phone ILIKE $${params.length} OR service_title ILIKE $${params.length} OR gotra ILIKE $${params.length})`;
      }

      query += ' ORDER BY created_at DESC';
      const result = await pool.query(query, params);
      return res.json({ success: true, count: result.rows.length, data: result.rows });
    } else {
      let data = [...memoryStore.bookings];
      if (status && status !== 'all') {
        data = data.filter(b => b.status === status);
      }
      if (search) {
        const s = search.toLowerCase();
        data = data.filter(b =>
          b.devotee_name?.toLowerCase().includes(s) ||
          b.phone?.includes(s) ||
          b.service_title?.toLowerCase().includes(s) ||
          b.gotra?.toLowerCase().includes(s)
        );
      }
      return res.json({ success: true, count: data.length, data });
    }
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, message: 'Server error fetching bookings' });
  }
}

export async function updateBookingStatus(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    if (isPostgresConnected) {
      const result = await pool.query(
        'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }
      return res.json({ success: true, data: result.rows[0] });
    } else {
      const booking = memoryStore.bookings.find(b => b.id === id);
      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }
      booking.status = status;
      return res.json({ success: true, data: booking });
    }
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ success: false, message: 'Server error updating booking' });
  }
}
