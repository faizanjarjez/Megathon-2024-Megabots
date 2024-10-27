import express from 'express';
import { Alert } from '../models/Alert.js';
import { sendSMSAlert, sendEmailAlert } from '../services/notification.js';
import { Contact } from '../models/Contact.js';

const router = express.Router();

// Get all alerts
router.get('/', async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching alerts' });
  }
});

// Create new alert
router.post('/', async (req, res) => {
  try {
    const alert = new Alert(req.body);
    await alert.save();
    res.status(201).json(alert);
  } catch (error) {
    res.status(400).json({ error: 'Error creating alert' });
  }
});

// Update alert status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const alert = await Alert.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (status === 'Approved') {
      const contacts = await Contact.find({
        state: alert.location.state,
        district: alert.location.district
      });

      // Send notifications to relevant contacts
      await Promise.all(contacts.map(contact => {
        return Promise.all([
          sendSMSAlert(contact.phone, alert),
          sendEmailAlert(contact.email, alert)
        ]);
      }));
    }

    res.json(alert);
  } catch (error) {
    res.status(400).json({ error: 'Error updating alert status' });
  }
});

export { router as alertRouter };