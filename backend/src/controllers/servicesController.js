import { pool, isPostgresConnected, memoryStore } from '../config/db.js';

export async function getServices(req, res) {
  try {
    const { category, featured } = req.query;

    if (isPostgresConnected) {
      let query = 'SELECT * FROM services WHERE 1=1';
      const params = [];

      if (category && category !== 'all') {
        params.push(category);
        query += ` AND category = $${params.length}`;
      }

      if (featured === 'true') {
        params.push(true);
        query += ` AND featured = $${params.length}`;
      }

      query += ' ORDER BY id ASC';
      const result = await pool.query(query, params);
      return res.json({ success: true, count: result.rows.length, data: result.rows });
    } else {
      // Memory fallback
      let data = [...memoryStore.services];
      if (category && category !== 'all') {
        data = data.filter(s => s.category === category);
      }
      if (featured === 'true') {
        data = data.filter(s => s.featured === true);
      }
      return res.json({ success: true, count: data.length, data });
    }
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ success: false, message: 'Server error fetching services' });
  }
}

export async function getServiceById(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isPostgresConnected) {
      const result = await pool.query('SELECT * FROM services WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Service not found' });
      }
      return res.json({ success: true, data: result.rows[0] });
    } else {
      const service = memoryStore.services.find(s => s.id === id);
      if (!service) {
        return res.status(404).json({ success: false, message: 'Service not found' });
      }
      return res.json({ success: true, data: service });
    }
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ success: false, message: 'Server error fetching service' });
  }
}
