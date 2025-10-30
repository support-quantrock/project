
import 'package:flutter/material.dart';

class ContactScreen extends StatelessWidget {
  const ContactScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16.0),
      children: [
        _buildContactInfoCard(),
        const SizedBox(height: 20),
        _buildFeedbackForm(),
      ],
    );
  }

  Widget _buildContactInfoCard() {
    return const Card(
      child: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Contact Us', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            SizedBox(height: 10),
            Text('Email: support@financialapp.com'),
            Text('Phone: 1-800-123-4567'),
          ],
        ),
      ),
    );
  }

  Widget _buildFeedbackForm() {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Send us a message', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 10),
            const TextField(
              decoration: InputDecoration(
                labelText: 'Your Name',
              ),
            ),
            const SizedBox(height: 10),
            const TextField(
              decoration: InputDecoration(
                labelText: 'Your Email',
              ),
            ),
            const SizedBox(height: 10),
            const TextField(
              maxLines: 5,
              decoration: InputDecoration(
                labelText: 'Your Message',
              ),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Handle form submission
              },
              child: const Text('Send'),
            ),
          ],
        ),
      ),
    );
  }
}
