/* Phabricator Request Format
{
  "object": {
    "type": "TASK",
    "phid": "PHID-TASK-abcd..."
  },
  "triggers": [
    {
      "phid": "PHID-HRUL-abcd..."
    }
  ],
  "action": {
    "test": false,
    "silent": false,
    "secure": false,
    "epoch": 12345
  },
  "transactions": [
    {
      "phid": "PHID-XACT-TASK-abcd..."
    }
  ]
}
*/

module.exports = function dingtalk(payload) {
  const object = payload.object;
  switch(object.type) {
    case 'TASK':
      return task_msg(object);
    default:
      return default_msg(object);
  }
}

function task_msg(object) {
  return {
    msgtype: 'markdown',
    markdown: {
      title: 'Phab任务',
      text: JSON.stringify(object),
    },
  };
}

function default_msg(object) {
  return {
    "msgtype": "text",
    "text": {
      "content": JSON.stringify(object),
    },
  }
}
