// @ts-nocheck
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import Navbar from "../components/Navbar";


export default class ExampleOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Parameter', 'NHAI N6', 'HUDCO N2'],
            tableData: [
                ['Bond Type', 'Regular', 'Regular',],
                ['Open', '1248', '1177.5',],
                ['Coupon', '8.75', '8.20',],
                ['Face Value', '1000', '1000',],
                ['Maturity Date', '05-Feb-2029', '05-Mar-2027',],
                ['Credit Rating', 'CRISIL AAA STABLE / CARE AAA / BWR AAA STABLE', 'CARE AA+ / IND AA+',],
                ['bYeild', '6.270560034906604', '6.2694014644950435',],
                ['ISIN', 'INE906B07DF8', 'INE031A07840',],
                ['Cash Flow', '510', '100'],
                ['Net Revenue', '199', '369'],
                ['CAGR', '137', '276']
                ['Gross Revenue', '907', '987'],
                ['P&L', '429', '618']

            ]
        }
    }

    render() {
        const state = this.state;
        const chartConfig = {
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false // optional
        };

        const data = {
            labels: ["NHAI N6", "HUDCO N2"],
            legend: ["Q1", "Q2", "Q3", "Q4"],
            data: [
                [60, 60, 60, 50],
                [30, 30, 60, 40]
            ],
            barColors: ["#4896f0", "#2881e7", "#1356a4", "#0d4688"]
        };
        return (
            <ScrollView style={styles.container}>
                <Navbar title="Compare Bonds" />
                <Table borderStyle={{ borderWidth: 0.8, borderColor: '#aea0ae' }}>
                    <Row data={state.tableHead} style={styles.head} textStyle={styles.textH} />
                    <Rows data={state.tableData} textStyle={styles.text} />
                </Table>
                <Text style={{ fontFamily: 'm', color: "#fff", fontSize: 18, marginTop: 32 }}>Cashflow of both the companies</Text>
                <StackedBarChart
                    style={{
                        marginVertical: 8,
                        borderRadius: 16, 
                        paddingBottom: 56
                    }}
                    data={data}
                    width={400}
                    height={220}
                    chartConfig={chartConfig}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 32, backgroundColor: '#121213' },
    head: { height: 40, backgroundColor: '#1F222A' },
    textH: { margin: 6, color: '#fefefe', textAlign: 'center', fontFamily: 'mb' },
    text: { margin: 6, color: '#eee', textAlign: 'center', fontFamily: 'm' }
});