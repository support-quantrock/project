
import 'package:flutter/material.dart';

class OffersScreen extends StatelessWidget {
  const OffersScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: 5, // Replace with the actual number of offers
      itemBuilder: (context, index) {
        return Card(
          margin: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
          child: ListTile(
            leading: const Icon(Icons.local_offer, color: Colors.blue),
            title: Text('Special Offer ${index + 1}'),
            subtitle: Text('Get a special discount on our new investment product.'),
            onTap: () {
              // Handle offer tap
            },
          ),
        );
      },
    );
  }
}
