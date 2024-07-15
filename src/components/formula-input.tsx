// @ts-nocheck
import { useCallback, useEffect, useState } from "react";

import placeholders from "./../utils/placeholder";
import useFormulaStore from "./../stores/useFormulaStore";

import CodeMirror from "@uiw/react-codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { autocompletion } from "@codemirror/autocomplete";

const fetchAutoCompleteList = async () => {
  const response = await fetch(
    "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const FormulaInput = () => {
  const [inputFormula, setInputFormula] = useState("");
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);
  const setResult = useFormulaStore((state) => state.setResult);
  const setError = useFormulaStore((state) => state.setError);

  useEffect(() => {
    const loadAutoCompleteList = async () => {
      try {
        const list = await fetchAutoCompleteList();
        setAutoCompleteOptions(list);
      } catch (error) {
        console.error("Failed to fetch autocomplete list", error);
      }
    };

    loadAutoCompleteList();
  }, []);

  const onChange = useCallback((val) => {
    setInputFormula(val);
    evaluateFormula(val);
  }, []);

  const evaluateFormula = (formula) => {
    try {
      setError(null);

      const evaluatedFormula = formula.replace(
        /\{\{([^}]+)\}\}/g,
        (match, p1) => {
          const item = autoCompleteOptions.find(
            (comp) => comp.name.trim() === p1.trim()
          );
          return item ? item.value : match;
        }
      );

      const evalResult = Function(
        '"use strict";return (' + evaluatedFormula + ")"
      )();
      setResult(evalResult);
    } catch (error) {
      console.error("Evaluation Error:", error);
      setError("ERROR");
      setResult(null);
    }
  };

  const autoCompleteList = (context, options) => {
    let before = context.matchBefore(/\w+/);
    if (!context.explicit && !before) return null;

    const mappedOptions = options.map(({ name }) => ({
      label: `{{${name}}}`,
      displayLabel: `${name}`,
      type: "variable",
    }));

    return {
      from: before ? before.from : context.pos,
      options: mappedOptions,
      validFor: /^\w*$/,
    };
  };

  const baseTheme = EditorView.theme({
    "&.cm-editor, &.cm-focused": {
      outline: "none",
      padding: "8px",
      border: "1px solid rgb(241 245 249)",
      borderRadius: "6px",
    },
  });

  return (
    <div>
      <CodeMirror
        value={inputFormula}
        basicSetup={{
          lineNumbers: false,
          highlightActiveLineGutter: false,
          foldGutter: false,
          dropCursor: false,
          allowMultipleSelections: false,
          indentOnInput: false,
          closeBrackets: false,
          bracketMatching: false,
          rectangularSelection: false,
          autocompletion: false,
          crosshairCursor: false,
          highlightActiveLine: false,
          highlightSelectionMatches: false,
          closeBracketsKeymap: false,
          foldKeymap: false,
          completionKeymap: false,
          lintKeymap: false,
          searchKeymap: false,
        }}
        extensions={[
          keymap.of(defaultKeymap),
          baseTheme,
          placeholders,
          autocompletion({
            override: [
              (context) => autoCompleteList(context, autoCompleteOptions),
            ],
          }),
        ]}
        onChange={onChange}
      />
    </div>
  );
};

export default FormulaInput;
