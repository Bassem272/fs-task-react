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
    <div className="space-y-8"> {/* Add consistent spacing between attribute groups */}
      {attributes
        .filter((attr) => this.isRelevantAttribute(attr.name))
        .map((attr) => {
          const kebabCaseName = attr.name.toLowerCase().replace(/\s+/g, '-');
          return (
            <div
              key={attr.id}
              className="attribute-group"
              data-testid={`cart-item-attribute-${kebabCaseName}`}
            >
              {/* Attribute Name */}
              <h3 className="mb-4 text-base font-semibold text-gray-900">
                {attr.name}
              </h3>
              {/* Attribute Options */}
              <div
                className={`grid ${
                  attr.name.toLowerCase() === 'color'
                    ? 'grid-cols-5 gap-4' // More spacing for color attributes
                    : 'grid-cols-3 gap-3'
                }`}
              >
                {attr.attribute_items.map((item) => {
                  const isSelected =
                    selectedAttributes[attr.name] === item.value;
                  return (
                    <button
                      key={item.id}
                      onClick={() =>
                        this.handleAttributeClick(attr.name, item.value)
                      }
                      className={`border text-sm rounded focus:outline-none flex justify-center items-center transition-all duration-200 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-100 shadow-lg'
                          : 'border-gray-300 bg-white shadow-sm'
                      }`}
                      style={
                        attr.name.toLowerCase() === 'color'
                          ? {
                              backgroundColor: item.value,
                              width: '50px',
                              height: '50px',
                              borderRadius: '50%', // Circular buttons for color
                              border: isSelected
                                ? '2px solid #3b82f6' // Blue border for selected
                                : '1px solid #d1d5db',
                            }
                          : {
                              padding: '10px 16px', // Padding for non-color buttons
                              height: '40px',
                              minWidth: '60px',
                            }
                      }
                      data-testid={`cart-item-attribute-${kebabCaseName}-${item.value
                        .toLowerCase()
                        .replace(/\s+/g, '-')}${
                        isSelected ? '-selected' : ''
                      }`}
                    >
                      {/* Display value for non-color attributes */}
                      {attr.name.toLowerCase() !== 'color' ? item.displayValue : ''}
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
