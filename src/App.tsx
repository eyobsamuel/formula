import React, { useEffect, useState } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/mode/javascript/javascript";

const FormulaInput = () => {
  const suggestions = [
    { name: "name1", category: "category 1", value: 9, id: "1" },
    { name: "name2", category: "category 2", value: 16, id: "2" },
    { name: "name3", category: "category 3", value: 95, id: "3" },
    { name: "name4", category: "category 4", value: 3, id: "4" },
    { name: "name5", category: "category 5", value: 51, id: "5" },
    { name: "name6", category: "category 6", value: 87, id: "6" },
    { name: "name7", category: "category 7", value: 57, id: "7" },
    { name: "name8", category: "category 8", value: 6, id: "8" },
    { name: "name9", category: "category 9", value: 40, id: "9" },
    { name: "name10", category: "category 10", value: 44, id: "10" },
    { name: "name11", category: "category 11", value: 90, id: "11" },
    { name: "name12", category: "category 12", value: 0, id: "12" },
    { name: "name13", category: "category 13", value: 99, id: "13" },
    { name: "name14", category: "category 14", value: 95, id: "14" },
    { name: "name15", category: "category 15", value: 60, id: "15" },
    { name: "name16", category: "category 16", value: 8, id: "16" },
    { name: "name17", category: "category 17", value: 60, id: "17" },
    { name: "name18", category: "category 18", value: 98, id: "18" },
    { name: "name19", category: "category 19", value: 75, id: "19" },
    { name: "name20", category: "category 20", value: 94, id: "20" },
    { name: "name21", category: "category 21", value: 92, id: "21" },
    { name: "name22", category: "category 22", value: 61, id: "22" },
    { name: "name23", category: "category 23", value: 24, id: "23" },
    { name: "name24", category: "category 24", value: 13, id: "24" },
    { name: "name25", category: "category 25", value: 50, id: "25" },
    { name: "name26", category: "category 26", value: 97, id: "26" },
    { name: "name27", category: "category 27", value: 22, id: "27" },
    { name: "name28", category: "category 28", value: 47, id: "28" },
    { name: "name29", category: "category 29", value: 24, id: "29" },
    { name: "name30", category: "category 30", value: 20, id: "30" },
    { name: "name31", category: "category 31", value: "9 + 10", id: "31" },
    { name: "name31", category: "category 31", value: "9 + 10", id: "31" },
    { name: "name32", category: "category 32", value: "9 + 10", id: "32" },
    { name: "name33", category: "category 33", value: "9 + 10", id: "33" },
    { name: "name34", category: "category 34", value: "9 + 10", id: "34" },
    { name: "name34", category: "category 34", value: "9 + 10", id: "34" },
    { name: "name35", category: "category 35", value: 21, id: "35" },
    { name: "name36", category: "category 36", value: 77, id: "36" },
    { name: "name37", category: "category 37", value: 52, id: "37" },
    { name: "name38", category: "category 38", value: 70, id: "38" },
    { name: "name39", category: "category 39", value: 49, id: "39" },
    { name: "name40", category: "category 40", value: 10, id: "40" },
    { name: "name41", category: "category 41", value: 3, id: "41" },
    { name: "name42", category: "category 42", value: 5, id: "42" },
    {
      name: "name43",
      category: "category 43",
      value: 16,
      id: "43",
      inputs: "hello ",
    },
  ];

  const [formula, setFormula] = useState("");
  const [result, setResult] = useState("");

  const generateReplacements = () => {
    return suggestions.reduce((acc, { name, value }) => {
      acc[name] = value;
      return acc;
    }, {});
  };

  const evaluateFormula = (input) => {
    const replacements = generateReplacements();

    const regex = new RegExp(Object.keys(replacements).join("|"), "g");

    const replacedFormula = input.replace(
      regex,
      (match) => replacements[match] || 0
    );

    try {
      const evaluated = eval(replacedFormula);
      setResult(evaluated);
    } catch (error) {
      setResult("Error");
    }
  };

  useEffect(() => {
    const editorElement = document.getElementById("formula-editor");
    if (!editorElement) return;

    const editor = CodeMirror.fromTextArea(editorElement, {
      mode: "javascript",
      theme: "material",
      lineNumbers: false,
      hintOptions: {
        hint: (editor) => {
          const cursor = editor.getCursor();
          const token = editor.getTokenAt(cursor);
          const start = token.start;
          const end = cursor.ch;
          const currentWord = token.string;

          const list =
            currentWord.length >= 2
              ? suggestions.filter((s) => s.name.startsWith(currentWord))
              : [];

          return {
            list: list.map((s) => s.name),
            from: CodeMirror.Pos(cursor.line, start),
            to: CodeMirror.Pos(cursor.line, end),
          };
        },
      },
    });

    editor.on("inputRead", (instance) => {
      instance.showHint();
    });

    editor.on("change", (instance) => {
      const value = instance.getValue();
      setFormula(value);
      evaluateFormula(value);
    });

    return () => {
      editor.toTextArea();
    };
  }, [suggestions]);

  return (
    <>
      <div id="result">Result: {result}</div>
      <textarea id="formula-editor" />
    </>
  );
};

export default FormulaInput;
