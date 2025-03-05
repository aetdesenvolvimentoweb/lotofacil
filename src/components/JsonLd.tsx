import React from "react";

// Definindo um tipo mais específico para os dados JSON-LD
type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdObject
  | JsonLdArray;
type JsonLdObject = { [key: string]: JsonLdValue };
type JsonLdArray = JsonLdValue[];

interface JsonLdProps {
  data: JsonLdObject;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
