
// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// class CartAttributes extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedAttributes: {},
//       isComplete: false,
//     };
//   }

//   handleAttributeClick = (attributeName, value) => {
//     this.setState(
//       (prevState) => ({
//         selectedAttributes: {
//           ...prevState.selectedAttributes,
//           [attributeName]: value,
//         },
//       }),
//       () => {
//         const allSelected = this.checkIfAllAttributesSelected();
//         if (allSelected) {
//           this.props.onAttributeChange(this.state.selectedAttributes);
//           this.setState({ isComplete: true });
//         }
//       }
//     );
//   };

//   checkIfAllAttributesSelected = () => {
//     const { attributes } = this.props;
//     const { selectedAttributes } = this.state;
//     return attributes.every((attr) => selectedAttributes.hasOwnProperty(attr.name));
//   };

//   isRelevantAttribute = (attributeName) => {
//     const relevantAttributes = ['Size', 'Color', 'Touch ID in keyboard', 'With USB 3 ports', 'Capacity'];
//     return relevantAttributes.includes(attributeName);
//   };

//   render() {
//     const { attributes } = this.props;
//     const { selectedAttributes } = this.state;

//     return (
//       <div>
//   {attributes
//     .filter((attr) => this.isRelevantAttribute(attr.name))
//     .map((attr) => {
//       const kebabCaseName = attr.name.toLowerCase().replace(/\s+/g, '-');
//       return (
//         <div key={attr.id} className="my-4" data-testid={`cart-item-attribute-${kebabCaseName}`}>
//           <h3 className="mb-2 text-sm">{attr.name}</h3>
//           <div className="flex flex-wrap space-x-2">
//             {attr.attribute_items.map((item) => {
//               const isSelected = selectedAttributes[attr.name] === item.value;
//               return (
//                 <button
//                   key={item.id}
//                   onClick={() => this.handleAttributeClick(attr.name, item.value)}
//                   className={`border px-2 py-1 text-xs rounded ${
//                     isSelected ? 'border-blue-500 shadow-md' : 'border-gray-300 shadow-sm'
//                   }`}
//                   style={
//                     attr.name.toLowerCase() === 'color'
//                       ? { backgroundColor: item.value, width: '30px', height: '30px' }
//                       : {}
//                   }
//                   data-testid={`cart-item-attribute-${kebabCaseName}-${item.value.toLowerCase().replace(/\s+/g, '-')}${isSelected ? '-selected' : ''}`}
//                 >
//                   {attr.name.toLowerCase() !== 'color' ? item.displayValue : ''}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       );
//     })}
// </div>

//     );
//   }
// }

// CartAttributes.propTypes = {
//   attributes: PropTypes.array.isRequired,
//   onAttributeChange: PropTypes.func.isRequired,
// };

// export default CartAttributes;
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartAttributes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttributes: {},
      isComplete: false,
    };
  }

  handleAttributeClick = (attributeName, value) => {
    this.setState(
      (prevState) => ({
        selectedAttributes: {
          ...prevState.selectedAttributes,
          [attributeName]: value,
        },
      }),
      () => {
        const allSelected = this.checkIfAllAttributesSelected();
        if (allSelected) {
          this.props.onAttributeChange(this.state.selectedAttributes);
          this.setState({ isComplete: true });
        }
      }
    );
  };

  checkIfAllAttributesSelected = () => {
    const { attributes } = this.props;
    const { selectedAttributes } = this.state;

    return attributes.every((attr) =>
      selectedAttributes.hasOwnProperty(attr.name)
    );
  };

  isRelevantAttribute = (attributeName) => {
    const relevantAttributes = [
      'Size',
      'Color',
      'Touch ID in keyboard',
      'With USB 3 ports',
      'Capacity',
    ];
    return relevantAttributes.includes(attributeName);
  };

  render() {
    const { attributes } = this.props;
    const { selectedAttributes } = this.state;

    return (
      <div>
        {attributes
          .filter((attr) => this.isRelevantAttribute(attr.name))
          .map((attr) => {
            const kebabCaseName = attr.name.toLowerCase().replace(/\s+/g, '-');
            return (
              <div
                key={attr.id}
                className="my-4"
                data-testid={`cart-item-attribute-${kebabCaseName}`}
              >
                <h3 className="mb-2 text-sm">{attr.name}</h3>
                <div className="flex flex-wrap space-x-2">
                  {attr.attribute_items.map((item) => {
                    const isSelected =
                      selectedAttributes[attr.name] === item.value;
                    return (
                      <button
                        key={item.id}
                        onClick={() =>
                          this.handleAttributeClick(attr.name, item.value)
                        }
                        className={`border px-2 py-1 text-xs rounded ${
                          isSelected
                            ? 'border-blue-500 shadow-md'
                            : 'border-gray-300 shadow-sm'
                        }`}
                        style={
                          attr.name.toLowerCase() === 'color'
                            ? {
                                backgroundColor: item.value,
                                width: '30px',
                                height: '30px',
                              }
                            : {}
                        }
                        data-testid={`cart-item-attribute-${kebabCaseName}-${item.value
                          .toLowerCase()
                          .replace(/\s+/g, '-')}${
                          isSelected ? '-selected' : ''
                        }`}
                      >
                        {attr.name.toLowerCase() !== 'color'
                          ? item.displayValue
                          : ''}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

CartAttributes.propTypes = {
  attributes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string,
      attribute_items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          displayValue: PropTypes.string,
          value: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  onAttributeChange: PropTypes.func.isRequired,
};

export default CartAttributes;
