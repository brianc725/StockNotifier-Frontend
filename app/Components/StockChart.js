import React from 'react'
import { View, Text } from 'react-native'
import { BarChart, Grid, YAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'

class StockChart extends React.PureComponent {

    render() {
        let { support, resistance, current } = this.props;

        // Convert numbers to float. 
        support = parseFloat(support);
        resistance = parseFloat(resistance);
        current = parseFloat(current);

        // Check if NaN
        if (isNaN(support)) {
            support = 0;
        }
        if (isNaN(resistance)) {
            resistance = 0;
        }
        if (isNaN(current)) {
            current = 0;
        }

        const data = [
            {
                value: resistance,
                label: 'Resistance',
            },
            {
                value: current,
                label: 'Current',
            },
            {
                value: support,
                label: 'Support',
            },
        ]


        return (
            <View style={{
                flexDirection: 'row',
                height: 200,
                marginLeft: 8,
                paddingVertical: 16
            }}>
                <YAxis
                    data={data}
                    yAccessor={({ index }) => index}
                    scale={scale.scaleBand}
                    contentInset={{ top: 10, bottom: 10 }}
                    spacing={0.2}
                    formatLabel={(_, index) => data[index].label}
                />
                <BarChart
                    style={{
                        flex: 1,
                        marginLeft: 8,
                        marginRight: 8,
                    }}
                    data={data}
                    horizontal={true}
                    yAccessor={({ item }) => item.value}
                    svg={{ fill: 'rgba(94, 141, 147, 0.8)' }}
                    contentInset={{ top: 10, bottom: 10 }}
                    spacing={0.2}
                    gridMin={0}
                >
                    <Grid direction={Grid.Direction.VERTICAL} />
                </BarChart>
            </View>
        )
    }

}

export default StockChart;