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
              id: "japan",
              color: "hsl(196, 70%, 50%)",
              data: [
                {
                  x: "plane",
                  y: 125
                },
                {
                  x: "helicopter",
                  y: 250
                },
                {
                  x: "boat",
                  y: 122
                },
                {
                  x: "train",
                  y: 94
                },
                {
                  x: "subway",
                  y: 207
                },
                {
                  x: "bus",
                  y: 215
                },
                {
                  x: "car",
                  y: 283
                },
                {
                  x: "moto",
                  y: 268
                },
                {
                  x: "bicycle",
                  y: 194
                },
                {
                  x: "horse",
                  y: 281
                },
                {
                  x: "skateboard",
                  y: 231
                },
                {
                  x: "others",
                  y: 268
                }
              ]
            },
            {
              id: "france",
              color: "hsl(303, 70%, 50%)",
              data: [
                {
                  x: "plane",
                  y: 89
                },
                {
                  x: "helicopter",
                  y: 91
                },
                {
                  x: "boat",
                  y: 14
                },
                {
                  x: "train",
                  y: 43
                },
                {
                  x: "subway",
                  y: 241
                },
                {
                  x: "bus",
                  y: 59
                },
                {
                  x: "car",
                  y: 119
                },
                {
                  x: "moto",
                  y: 260
                },
                {
                  x: "bicycle",
                  y: 192
                },
                {
                  x: "horse",
                  y: 223
                },
                {
                  x: "skateboard",
                  y: 245
                },
                {
                  x: "others",
                  y: 55
                }
              ]
            },
            {
              id: "us",
              color: "hsl(261, 70%, 50%)",
              data: [
                {
                  x: "plane",
                  y: 20
                },
                {
                  x: "helicopter",
                  y: 140
                },
                {
                  x: "boat",
                  y: 169
                },
                {
                  x: "train",
                  y: 258
                },
                {
                  x: "subway",
                  y: 270
                },
                {
                  x: "bus",
                  y: 137
                },
                {
                  x: "car",
                  y: 250
                },
                {
                  x: "moto",
                  y: 188
                },
                {
                  x: "bicycle",
                  y: 122
                },
                {
                  x: "horse",
                  y: 181
                },
                {
                  x: "skateboard",
                  y: 194
                },
                {
                  x: "others",
                  y: 55
                }
              ]
            },
            {
              id: "germany",
              color: "hsl(274, 70%, 50%)",
              data: [
                {
                  x: "plane",
                  y: 53
                },
                {
                  x: "helicopter",
                  y: 194
                },
                {
                  x: "boat",
                  y: 207
                },
                {
                  x: "train",
                  y: 120
                },
                {
                  x: "subway",
                  y: 56
                },
                {
                  x: "bus",
                  y: 156
                },
                {
                  x: "car",
                  y: 237
                },
                {
                  x: "moto",
                  y: 157
                },
                {
                  x: "bicycle",
                  y: 150
                },
                {
                  x: "horse",
                  y: 207
                },
                {
                  x: "skateboard",
                  y: 211
                },
                {
                  x: "others",
                  y: 55
                }
              ]
            },
            {
              id: "norway",
              color: "hsl(86, 70%, 50%)",
              data: [
                {
                  x: "plane",
                  y: 45
                },
                {
                  x: "helicopter",
                  y: 244
                },
                {
                  x: "boat",
                  y: 167
                },
                {
                  x: "train",
                  y: 249
                },
                {
                  x: "subway",
                  y: 13
                },
                {
                  x: "bus",
                  y: 110
                },
                {
                  x: "car",
                  y: 285
                },
                {
                  x: "moto",
                  y: 177
                },
                {
                  x: "bicycle",
                  y: 73
                },
                {
                  x: "horse",
                  y: 36
                },
                {
                  x: "skateboard",
                  y: 211
                },
                {
                  x: "others",
                  y: 45
                }
              ]
            }
          ]}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", stacked: true, min: "auto", max: "auto" }}
          curve="cardinal"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "transportation",
            legendOffset: 36,
            legendPosition: "middle"
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "count",
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
