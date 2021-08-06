type Attribute = {
  id: number;
  name: string;
  type: string;
  value: number;
};

export type AttributesTypes = {
  [type: string]: {
    [name: string]: number;
  };
};

function handleFormattedAttributes(attributes: Attribute[]): [string[], AttributesTypes] {
  const attributesTypes: AttributesTypes = {};

  attributes.forEach((attribute) => {
    attributesTypes[attribute.type] = {
      ...attributesTypes[attribute.type],
      [attribute.name]: attribute.value,
    };
  });

  return [Object.keys(attributesTypes), attributesTypes];
}

export default handleFormattedAttributes;
