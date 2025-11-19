// docs：https://cz-git.qbb.sh/zh
import { defineConfig } from "cz-git";

export default defineConfig({
  ignores: [commit => commit.includes("init")],
  extends: ["@commitlint/config-conventional"],
  rules: {
    // 只保留最常用的4种提交类型
    "type-enum": [2, "always", ["feat", "fix", "docs", "chore"]],
  },
  prompt: {
    messages: {
      type: "选择提交类型: ",
      subject: "填写变更描述:\n",
      confirmCommit: "确认提交?",
    },
    types: [
      { value: "feat", name: "feat: 新增功能", emoji: "🚀" },
      { value: "fix", name: "fix: 修复问题", emoji: "🐞" },
      { value: "docs", name: "docs: 文档更新", emoji: "📚" },
      { value: "chore", name: "chore: 其他修改", emoji: "🔨" },
    ],
    // 跳过所有不必要的步骤
    skipQuestions: ["scope", "body", "breaking", "footerPrefixesSelect", "footer"],
    useEmoji: true,
    emojiAlign: "center",
    upperCaseSubject: false,
    allowEmptyScopes: true,
    allowBreakingChanges: [],
  },
});
