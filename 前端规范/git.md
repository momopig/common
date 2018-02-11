

#### 分支管理
##### 分支合并
    - 同分支之间通过rebase合并代码，保持主线到commit生命线干净: `git pull --rebase`
    - 不同分支之间通过merge合并，减少合并的风险

##### 长期分支
正常情况下，远程仓库中只有两个长期分支：master和develop

    - develop: 日常开发分支
    - master: 对外发布的分支
    - 版本正式对外发布后，会在master上打tag
    - 如果已发布的版本有bug，需要在develop和master上同步修复
##### 临时分支
- 功能分支: 命名格式为`feature-*`
    - 日常开发尽量都在develop分支上进行，功能分支应该在当前功能会block其他人开发的情况下才创建
    - 功能分支开发并自测完后，合并到develop，整个功能分支的生命周期如下：
    
    ```
    创建分支：git checkout -b feature-x develop
    切换并合并到develop：
    git checkout develop
    git merge --no-ff feature-x
    删除分支：git branch -d feature-x
    如果有远程分支，需要同时删除远程分支：git push origin --delete feature-x或者git push origin :feature-x
    ```
    - 说明: 功能分支可以视情况，用fork替代
    
- 预发布: 命名格式为`release-*`
    - 测试同学如果需要一个不受开发影响的分支，可以创建预发布分支
    - 如果测试有紧急bug，需要在release和develop分支上同时修复
    - 测试没问题后，可以合并到master，整个生命周期如下:
    
    ```
    git checkout -b release-1.2 develop
    ...开发中...
    git checkout master
    git merge --no-ff release-1.2
    git tag -a 1.2
    git branch -d release-1.2
    ```
    - 说明: 此分支可以通过在develop上打tag的方式来确定测试的版本，由测试同学灵活控制
    
- 修复bug: 命名格式为`hotfix-*`
    - 当已发布版本出现bug的时候，需要创建hotfix分支
    - bug修复后，须要将修改同时同步到develop和master，整个hotfix的生命周期如下：
    
    ```
    git checkout -b hotfix-1.2.0 master
    ...bug修复中...
    git checkout master
    git merge --no-ff hotfix-1.2.0
    git tag -a 1.2.1
    同时合并到develop分支
    git checkout develop
    git merge --no-ff hotfix-0.1
    git branch -d hotfix-0.1
    ```
    - 说明: 注意这里使用--no-ff，以确保每次merger都会生成一个commit(默认fast forward不会生成commit节点)，保证生命周期清晰
  
#### commit编写规范
同时格式如下：
```
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```
举例:
```
feat(graph-dc-inbound): 增加了一个功能模块

1. 增加了xxx的功能
2. 更新了之前的xxx功能
3. 移除了xxx部分的代码
4. 数据库增加了xxx字段

Close #999
```

- type: 必须填写，是当前commit的类型，约定如下：
  - feat: 新功能
  - fix: 修复bug
  - docs: 文档
  - style: 格式(不影响代码的变动)
  - refactor: 重构(不增加新功能，也不修改bug)
  - test: 增加测试
  - chore: 杂项，构建脚本或者其他辅助工具
- scope: 必须填写，当前修改的影响范围，约定为模块的名称
- subject: 必须填写，当前修改的简短描述
  - 以第一人称描述
  - 末尾不加结尾符
  - 如果是英文描述，首字母不需要大写
- body: 可选项，对当前修改的详细描述
  - 以第一人称描述
  - 可以分多行
  - 通常用于描述当前修改的原因，或者和之前代码的区别
- footer: 可选项，主要用于新代码和JIRA上某个任务相关连，可以在此填写，后续会通过这个自动关闭JIRA任务，例如`Close #123, #245, #992`

以约定的格式提交后，可以方便查看提交历史，比如:
- 查看README.md文件的修改历史：`git log --oneline README.md`
- 如果想看修改的diff日志，可以加上`-p`
- 可能修改会很多，可以通过修改类型来过滤：`git log --oneline README.md | grep docs`或者`git log --oneline --grep=‘docs’ README.md`
- 如果想在此基础上查看指定某人的提交，可以加上`--author=xxx`
其他更多的参数，可以参考：http://blog.csdn.net/chenpeng78/article/details/55212208

> 如果使用idea开发的同学，可以直接在idea中使用Version Control进行界面的过滤操作