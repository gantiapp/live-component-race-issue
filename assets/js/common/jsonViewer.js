import {JSONEditor, stringifyJSONPath} from "vanilla-jsoneditor";
import {copyToClipboard} from "./copy";

export default (element, json) => {
  if (element === null) {
    return;
  }

  const content = {
    json: JSON.parse(json)
  };

  new JSONEditor({
    target: element,
    props: {
      content,
      readOnly: true,
      onRenderMenu: renderMenu
    }
  });
}

const renderMenu = (mode, items) => {
  if (mode !== 'tree') {
    return;
  }

  const customCopyJsonbButton = {
    className: 'jse-copy-jsonb',
    title: 'Copy Jsonb SQL',
    icon: {
      iconName: 'jsoneditor-jsonb',
      icon: [
          512,
          512,
          [],
          null,
          "M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z"
      ]
    },
    onClick: copyJsonbToClipboard
  };

  const itemsWithoutSpace = items.slice(0, items.length - 2);

  return itemsWithoutSpace.concat([customCopyJsonbButton, { space: true }]);
}

const copyJsonbToClipboard = (e) => {
  const copyJsonbButton = e.currentTarget;

  const jse = copyJsonbButton.closest('.jse-main');
  const jseNavbar = jse.querySelector('.jse-navigation-bar');
  const jseNavbarEditInput = jseNavbar.querySelector('.jse-navigation-bar-text');

  let value;

  if (jseNavbarEditInput !== null) {
    value = jseNavbarEditInput.value;
  } else {
    const splitPath = Array.from(jseNavbar.querySelectorAll('.jse-navigation-bar-button:not(.jse-navigation-bar-arrow)')).map(item => item.innerText);
    value = stringifyJSONPath(splitPath);
  }

  copyToClipboard(parseJsonPath(value.slice(1).split('.')));

  copyJsonbButton.classList.add('copy-success');
  copyJsonbButton.blur();

  setTimeout(() => {
    copyJsonbButton.classList.remove('copy-success');
  }, 1000);
}

const parseJsonPath = (pathElements, sql = "", index = 0) => {
  if (index + 1 > pathElements.length) return sql;

  const element = pathElements[index];

  if (/\[\d+]/.test(element)) {
    if (index === 0 && /^\[\d+]$/.test(element)) {
      sql = "jsonb_array_elements(jsondata)";
    } else {
      const key = element.match(/[a-zA-Z]+/)[0];
      sql = `jsonb_array_elements(${sql}->'${key}')`;
    }
  } else if (index === 0) {
    sql = 'jsondata';

    if (element !== '') {
      sql = `->'${element}'`;
    }
  } else if (index + 1 < pathElements.length) {
    sql += `->'${element}'`;
  } else {
    sql += `->>'${element}'`;
  }

  return parseJsonPath(pathElements, sql, ++index);
}