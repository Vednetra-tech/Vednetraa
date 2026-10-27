import { db, getDb, memoryStore, withoutId, escapeRegex, nextId } from '../db.js';

const VALID_BOOKING_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'];

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

    const connected = db.state.connected;
    const record = {
      id: connected ? await nextId('bookings') : memoryStore.bookings.length + 1,
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
      created_at: connected ? new Date() : new Date().toISOString()
    };

    if (connected) {
      await getDb().collection('bookings').insertOne(record);
    } else {
      memoryStore.bookings.unshift(record);
    }

    return res.status(201).json({
      success: true,
      message: 'सङ्कल्प एवं पूजा आरक्षण सफलतापूर्वक दर्ज किया गया।',
      data: withoutId(record)
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({ success: false, message: 'Server error processing booking request' });
  }
}

export async function getBookings(req, res) {
  try {
    const { status, search } = req.query;

    if (db.state.connected) {
      const filter = {};
      if (typeof status === 'string' && status && status !== 'all') {
        filter.status = status;
      }
      if (typeof search === 'string' && search) {
        const pattern = { $regex: escapeRegex(search), $options: 'i' };
        filter.$or = [
          { devotee_name: pattern },
          { phone: pattern },
          { service_title: pattern },
          { gotra: pattern }
        ];
      }
      const data = await getDb()
        .collection('bookings')
        .find(filter, { projection: { _id: 0 } })
        .sort({ created_at: -1 })
        .toArray();
      return res.json({ success: true, count: data.length, data });
    }

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
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching bookings' });
  }
}

export async function updateBookingStatus(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;

    if (!VALID_BOOKING_STATUSES.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    if (db.state.connected) {
      const updated = await getDb()
        .collection('bookings')
        .findOneAndUpdate(
          { id },
          { $set: { status } },
          { returnDocument: 'after', projection: { _id: 0 } }
        );
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }
      return res.json({ success: true, data: updated });
    }

    const booking = memoryStore.bookings.find(b => b.id === id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    booking.status = status;
    return res.json({ success: true, data: booking });
  } catch (error) {
    console.error('Error updating booking status:', error);
    return res.status(500).json({ success: false, message: 'Server error updating booking' });
  }
}
