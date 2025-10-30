
import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';

class PortfolioScreen extends StatelessWidget {
  const PortfolioScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16.0),
      children: [
        _buildPortfolioSummaryCard(),
        const SizedBox(height: 20),
        _buildInvestmentsCard(),
      ],
    );
  }

  Widget _buildPortfolioSummaryCard() {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Portfolio Summary', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 10),
            SizedBox(
              height: 200,
              child: PieChart(
                PieChartData(
                  sections: [
                    PieChartSectionData(color: Colors.blue, value: 40, title: 'Stocks'),
                    PieChartSectionData(color: Colors.green, value: 30, title: 'Bonds'),
                    PieChartSectionData(color: Colors.orange, value: 15, title: 'Real Estate'),
                    PieChartSectionData(color: Colors.red, value: 15, title: 'Cash'),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildInvestmentsCard() {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Investments', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 10),
            ListTile(
              leading: const Icon(Icons.show_chart),
              title: const Text('AAPL'),
              subtitle: const Text('Apple Inc.'),
              trailing: const Text('\$1,000'),
            ),
            ListTile(
              leading: const Icon(Icons.show_chart),
              title: const Text('GOOGL'),
              subtitle: const Text('Alphabet Inc.'),
              trailing: const Text('\$1,500'),
            ),
            ListTile(
              leading: const Icon(Icons.show_chart),
              title: const Text('TSLA'),
              subtitle: const Text('Tesla, Inc.'),
              trailing: const Text('\$2,000'),
            ),
          ],
        ),
      ),
    );
  }
}
