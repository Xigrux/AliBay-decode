import React, { Component } from "react";
import { ResponsiveLine } from "@nivo/line";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

class Graph extends Component {
  render() {
    return (
      <div style={{ height: 400 }}>
        <ResponsiveLine
          data={[
            {
              id: "Page Views",
              color: "hsl(196, 70%, 50%)",
              data: [
                {
                  x: "JUL",
                  y: 125
                },
                {
                  x: "AUG",
                  y: 150
                },
                {
                  x: "SEP",
                  y: 122
                },
                {
                  x: "OCT",
                  y: 94
                },
                {
                  x: "NOV",
                  y: 207
                }
              ]
            },
            {
              id: "Monthly Sales",
              color: "hsl(196, 70%, 50%)",
              data: [
                {
                  x: "JUL",
                  y: 25
                },
                {
                  x: "AUG",
                  y: 50
                },
                {
                  x: "SEP",
                  y: 22
                },
                {
                  x: "OCT",
                  y: 94
                },
                {
                  x: "NOV",
                  y: 70
                }
              ]
            }
          ]}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", stacked: true, min: "auto", max: "auto" }}
          curve="catmullRom"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            // legend: "transportation",
            legendOffset: 36,
            legendPosition: "middle"
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            // legend: "count",
            legendOffset: -40,
            legendPosition: "middle"
          }}
          colors={{ scheme: "nivo" }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
        />
      </div>
    );
  }
}

export default Graph;
