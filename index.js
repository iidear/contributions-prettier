
// github 统计 contribution 的规则
// https://docs.github.com/en/github/setting-up-and-managing-your-github-profile/why-are-my-contributions-not-showing-up-on-my-profile
// Commits will appear on your contributions graph if they meet all of the following conditions:
//   The email address used for the commits is associated with your GitHub account.
//   The commits were made in a standalone repository, not a fork.
//   The commits were made:
//     In the repository's default branch
//     In the gh-pages branch (for repositories with project sites)

// contributions 网格:
//   按日期从上到下，从左到右排列
//   列的长度为 7 格，从 周日 开始到 周一 结束（按 UTC 时间计算）
//   横向长度随屏幕宽度伸缩，在 13.3 英寸屏幕上为 53 列，最后一列长度可能不全

// 字母设计
// 单个字母占 7 * 7，其中左右各空一列
// 起始日期开始的 49 天

const { execSync } = require('child_process');

const alphabet = {
  'E': [
    [0, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
  ],
  'H': [
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
  ],
  'L': [
    [0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
  ],
  'O': [
    [0, 0, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 0, 1, 1, 1, 0, 0],
  ],
};

const oneDayTime = 24 * 60 * 60 * 1000;

function displayChar(c, startTime) {
  if (!alphabet.hasOwnProperty(c)) {
    throw new Error('字母表缺少对应字母');
  }

  const matrix = alphabet[c];
  let timeStamp = startTime;
  for (let col = 0; col < matrix.length; col++) {
    for (let row = 0; row < matrix[col].length; row++) {
      if (matrix[row][col]) {
        // commit
        const cmd = `git commit --allow-empty -m '${c}' --date='${new Date(timeStamp).toUTCString()}'`;
        // deeper color
        execSync(cmd);
        execSync(cmd);
        execSync(cmd);
        execSync(cmd);
        execSync(cmd);
      }
      timeStamp += oneDayTime;
    }
  }
}

function display(word) {
  // 校正时间起点
  const dt = new Date();
  const utcDay = dt.getUTCDay();
  if (utcDay < 6) {
    dt.setTime(dt.getTime() - utcDay * oneDayTime);
  }

  const reversedWord = word.split('').reverse().join('');
  // 计算起始位置
  for (let c of reversedWord) {
    dt.setTime(dt.getTime() - 7 * 7 * oneDayTime);
    console.info(`write '${c}'`);
    displayChar(c, dt.getTime());
  }
}

display('HELLO');
