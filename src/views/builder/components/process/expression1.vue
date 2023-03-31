<!--
 * @Author: Sandy
 * @Date: 2023-03-30 16:22:41
 * @Description: 表达式处理
-->
<template>
  <div>
    <h1>test</h1>
    <p>效果展示</p>

    <h2>Simple Demo</h2>
    <!-- Create the editor container -->
    <div id="editor"></div>

    <br />
    <h2>Advanced Demo</h2>
    <p>加载消息，编程方法</p>
    <div id="editor2"></div>
    <div style="margin-top: 5px">
      <button onclick="showMenu()">Show @ Menu</button>
      <button @click="addMention()">Add Tag</button>
    </div>
  </div>
</template>

<script>
  var quill2 = null;
  export default {
    data() {
      return {
        // quill2: null,
      };
    },
    props: ['tagList'],
    mounted() {
      const atValues = [
        { id: '515fd775-cb54-41f3-b921-56163871e2cf', value: 'Mickey Dooley' },
        {
          id: '3f0b7933-57b8-4d9d-b238-f8af62b2e945',
          value: 'Desmond Waterstone',
        },
        { id: '711f68ab-ca20-4011-ab0f-d98c8fac4c05', value: 'Jeralee Fryd' },
        { id: '775e05fc-72bc-48a1-9508-5c61674734f1', value: 'Eddie Hucquart' },
        { id: 'e8701885-105e-4a21-b200-98e559776655', value: 'Nathalia Whear' },
      ];

      const hashValues = [
        { id: '0075256a-19c2-4a2d-b549-627000bcc3bc', value: 'Accounting' },
        {
          id: '91e8901b-e3bf-4158-8ddf-7f5d9e8cbb7f',
          value: 'Product Management',
        },
        { id: 'c3373e89-7ab8-4a45-8b69-0b0cc49d89a9', value: 'Marketing' },
        { id: 'fa22f1d2-16c8-4bea-b869-8acad16e187a', value: 'Engineering' },
        { id: 'fe681168-f315-42f0-b78b-b1ea787fa1fd', value: 'Accounting' },
      ];

      const advancedValues = [
        { id: '1', value: 'Manuel Neuer', team: 'Bayern Munich' },
        { id: '2', value: 'Robert Lewandowski', team: 'Bayern Munich' },
        { id: '3', value: 'Thomas Muller', team: 'Bayern Munich' },
        { id: '4', value: 'Roman Burki', team: 'Borussia Dortmund' },
        { id: '5', value: 'Jadon Sancho', team: 'Borussia Dortmund' },
        { id: '6', value: 'Marco Reus', team: 'Borussia Dortmund' },
        { id: '7', value: 'Alexander Nubel', team: 'Schalke 04' },
        { id: '8', value: 'Bastian Oczipka', team: 'Schalke 04' },
        { id: '9', value: 'Weston McKennie', team: 'Schalke 04' },
      ];

      var quill = new Quill('#editor', {
        placeholder: 'Start by typing @ for mentions or # for hashtags...',
        modules: {
          mention: {
            allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
            mentionDenotationChars: ['@', '#'],
            source: function (searchTerm, renderList, mentionChar) {
              let values;

              if (mentionChar === '@') {
                values = atValues;
              } else {
                values = hashValues;
              }

              if (searchTerm.length === 0) {
                renderList(values, searchTerm);
              } else {
                const matches = [];
                for (i = 0; i < values.length; i++)
                  if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
                    matches.push(values[i]);
                renderList(matches, searchTerm);
              }
            },
          },
        },
      });

      quill2 = new Quill('#editor2', {
        placeholder: 'Start by typing @ for mentions',
        modules: {
          mention: {
            allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
            mentionDenotationChars: ['@'],
            positioningStrategy: 'fixed',
            renderItem: (data) => {
              if (data.disabled) {
                return `<div style="height:10px;line-height:10px;font-size:10px;background-color:#ccc;margin:0 -20px;padding:4px">${data.value}</div>`;
              }
              return data.value;
            },
            renderLoading: () => {
              return 'Loading...';
            },
            source: function (searchTerm, renderList, mentionChar) {
              var matches = [];

              if (searchTerm.length === 0) {
                matches = advancedValues;
              } else {
                for (i = 0; i < advancedValues.length; i++)
                  if (~advancedValues[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
                    matches.push(advancedValues[i]);
              }

              //create group header items
              var matchesWithGroupHeaders = [];
              var currentTeam;
              for (i = 0; i < matches.length; i++) {
                var match = matches[i];
                if (currentTeam !== match.team) {
                  matchesWithGroupHeaders.push({
                    id: match.team,
                    value: match.team,
                    disabled: true,
                  });
                  currentTeam = match.team;
                }
                matchesWithGroupHeaders.push(match);
              }
              matches = matchesWithGroupHeaders;

              window.setTimeout(() => {
                renderList(matches, searchTerm);
              }, 1000);
            },
          },
        },
      });

      function showMenu() {
        quill2.getModule('mention').openMenu('@');
      }

      window.addEventListener('mention-clicked', function (event) {
        console.log(event);
      });
    },
    methods: {
      addMention() {
        quill2.getModule('mention').insertItem(
          {
            denotationChar: '@',
            id: '123abc',
            value: 'Hello World',
          },
          true
        );
      },
    },
  };
</script>

<style lang="scss">
  .ql-editor {
    border: 1px solid #a3a3a3;
    border-radius: 6px;
  }

  .ql-editor-disabled {
    border-radius: 6px;
    background-color: rgba(124, 0, 0, 0.2);
    transition-duration: 0.5s;
  }

  .ql-editor:focus {
    border: 1px solid #025fae;
  }
  //   .expression {
  //     // display: flex;
  //     min-height: 42px;
  //     word-break: break-all;
  //     flex-wrap: wrap;
  //     align-items: flex-start;
  //     gap: 4px;
  //     width: 100%;
  //     box-sizing: border-box;
  //     padding: 8px 16px;
  //     font-size: 14px;
  //     line-height: 24px;
  //     margin: 0;
  //     overflow: auto;
  //     cursor: text;

  //     span {
  //       &.tag {
  //         color: #5652ff;
  //         border: 1px solid #5652ff;
  //       }
  //     }
  //   }

  .line {
    background: #ffffff;
    height: 2px;
  }

  .tag {
    font-size: 12px;
    color: #202226;
    padding-left: 10px;
    height: 24px;
    line-height: 24px;
    border: 1px solid #abacae;
    box-sizing: border-box;
    border-radius: 15px;
    display: inline-flex;
    width: fit-content;
    align-items: center;
    padding: 2px 4px 2px 8px;

    .tag-close {
      // width: 22px;
      // height: 20px;
      margin-left: 4px;
      cursor: pointer;
      // background: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.578 5l2.93-3.493a.089.089 0 0 0-.068-.146h-.891a.182.182 0 0 0-.137.064l-2.417 2.88-2.416-2.88a.178.178 0 0 0-.137-.064h-.89a.089.089 0 0 0-.069.146L4.413 5l-2.93 3.493a.089.089 0 0 0 .068.146h.89a.182.182 0 0 0 .138-.064l2.416-2.88 2.417 2.88c.033.04.083.064.137.064h.89a.089.089 0 0 0 .069-.146l-2.93-3.493z' fill='%23000' fill-opacity='.45'/%3E%3C/svg%3E") center no-repeat;
    }

    .remove-icon {
      width: 18px;
      height: 18px;
    }
  }
</style>
