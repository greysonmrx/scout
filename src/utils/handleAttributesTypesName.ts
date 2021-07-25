type AttributesTypesName = {
  [attributeTypeName: string]: string;
}

const attributesTypesName: AttributesTypesName = {
  technical_attributes: 'Técnicos',
  mental_attributes: 'Mentais',
  physical_attributes: 'Físicos',
  emotional_attributes: 'Emocionais',
};

function handleAttributesTypesName(attributeTypeName: string): string {
  return attributesTypesName[attributeTypeName] || attributeTypeName;
}

export default handleAttributesTypesName;
