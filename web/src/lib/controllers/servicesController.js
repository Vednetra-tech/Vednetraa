import { db, getDb, memoryStore } from '../db.js';

export async function getServices(req, res) {
  try {
    const { category, featured } = req.query;

    if (db.state.connected) {
      const filter = {};
      if (typeof category === 'string' && category && category !== 'all') {
        filter.category = category;
      }
      if (featured === 'true') {
        filter.featured = true;
      }
      const data = await getDb()
        .collection('services')
        .find(filter, { projection: { _id: 0 } })
        .sort({ id: 1 })
        .toArray();
      return res.json({ success: true, count: data.length, data });
    }

    let data = [...memoryStore.services];
    if (category && category !== 'all') {
      data = data.filter(s => s.category === category);
    }
    if (featured === 'true') {
      data = data.filter(s => s.featured === true);
    }
    return res.json({ success: true, count: data.length, data });
  } catch (error) {
    console.error('Error fetching services:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching services' });
  }
}

export async function getServiceById(req, res) {
  try {
    const id = parseInt(req.params.id, 10);

    if (db.state.connected) {
      const service = await getDb()
        .collection('services')
        .findOne({ id }, { projection: { _id: 0 } });
      if (!service) {
        return res.status(404).json({ success: false, message: 'Service not found' });
      }
      return res.json({ success: true, data: service });
    }

    const service = memoryStore.services.find(s => s.id === id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    return res.json({ success: true, data: service });
  } catch (error) {
    console.error('Error fetching service:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching service' });
  }
}
