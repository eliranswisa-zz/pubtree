import React, { Component } from 'react';
import Tree from 'react-d3-tree';

// rm this when we get the proper data
const myTreeData = [
  {
    name: 'Top Level',
    attributes: {
      keyA: 'val A',
    },
    children: [
      {
        name: 'Level 2: A',
        attributes: {
          keyA: 'val A',
        },
      },
      {
        name: 'Level 2: B',
        children: [
          {
            name: 'Level 3: A',
            attributes: {
              keyA: 'val A',
            },
          },
          {
            name: 'Level 3: B',
            attributes: {
              keyA: 'val A',
            },
            children: [
              {
                name: 'Level 3: A',
                attributes: {
                  keyA: 'val A',
                },
                children: [
                  {
                    name: 'Level 3: A',
                    attributes: {
                      keyA: 'val A',
                    },
                  },
                  {
                    name: 'Level 3: B',
                    attributes: {
                      keyA: 'val A',
                    },
                  }],

              },
              {
                name: 'Level 3: B',
                attributes: {
                  keyA: 'val A',
                },
                children: [
                  {
                    name: 'Level 3: A',
                    attributes: {
                      keyA: 'val A',
                    },
                  },
                  {
                    name: 'Level 3: B',
                    attributes: {
                      keyA: 'val A',
                    },
                    children: [
                      {
                        name: 'Level 3: A',
                        attributes: {
                          keyA: 'val A',
                        },
                        children: [
                          {
                            name: 'Level 3: A',
                            attributes: {
                              keyA: 'val A',
                            },
                          },
                          {
                            name: 'Level 3: B',
                            attributes: {
                              keyA: 'val A',
                            },
                          }],

                      },
                      {
                        name: 'Level 3: B',
                        attributes: {
                          keyA: 'val A',
                        },
                      }],

                  }],

              }],

          }],
      },
      {
        name: 'Level 2: C',
      },
      {
        name: 'Level 2: D',
      },
      {
        name: 'Level 2: E',
      },
      {
        name: 'Level 2: C',
      },
      {
        name: 'Level 2: D',
      },
      {
        name: 'Level 2: E',
      },
      {
        name: 'Level 2: C',
      },
      {
        name: 'Level 2: D',
      },
      {
        name: 'Level 2: E',
      },

    ],
  },
];

class CollapsibleTree extends Component {
  render() {
    const translate = {x: 700, y: 25};
    return (
      <div id="treeWrapper" style={{width: '1500px', height: '1500px'}}>
        <Tree
          data={this.props.data ? this.props.data : myTreeData}
          translate={translate}
          orientation={'vertical'}
          zoom={0.7}
        />
      </div>
    );
  }
}

export default CollapsibleTree;
