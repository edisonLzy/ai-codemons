# FAQ

## 问题一：为什么 `pom.xml` 中的 dependency 都没有写具体的版本号？

### 问题是什么？
1. **说明问题是什么？**
   在项目的子模块（如 `huiju-housepivot-stats-start/pom.xml`）中，大部分通过 `<dependency>` 引入的依赖（如 `spring-boot-starter-web-essential` 等）都没有写明 `<version>` 版本号。
2. **说明问题的上下文是什么？**
   项目是一个基于 Maven 构建的 Java 多模块（Multi-Module）工程。存在统领全局的根 `pom.xml`，且根项目也继承了公司级的基础设施父 POM。

### 回答是什么？
1. **涉及到的知识点是什么？**
   - Maven 的父 POM 继承（`<parent>`）机制
   - Maven 的依赖管理（`<dependencyManagement>`）
   - BOM（物料清单, Bill of Materials）模式

   **相关代码：**
   ```xml
   <!-- 子模块 huiju-housepivot-stats-start/pom.xml 中不写版本号的依赖 -->
   <dependency>
       <groupId>com.lianjia.infrastructure</groupId>
       <artifactId>spring-boot-starter-web-essential</artifactId>
       <!-- <version> 这里不需要写具体的版本号 </version> -->
   </dependency>
   ```

   ```xml
   <!-- 在父/根 pom.xml 中，通过 dependencyManagement 统一接管版本号 -->
   <dependencyManagement>
       <dependencies>
           <dependency>
               <groupId>com.lianjia.infrastructure</groupId>
               <artifactId>infrastructure-dependencies</artifactId>
               <version>${ke-infrastructure.version}</version>
               <type>pom</type>
               <scope>import</scope>
           </dependency>
       </dependencies>
   </dependencyManagement>
   ```

2. **答案是什么？**
   这是企业级 Java 开发的最佳实践。项目根目录的 `pom.xml` 及其继承的父工程通过 `<dependencyManagement>` 提前宣告并锁定了一系列核心类库与基础设施包的安全版本号集合（如 BOM）。
   当子模块在 `<dependencies>` 中需要使用这些包时，刻意不写版本号，Maven 会自动查阅顶层的 `<dependencyManagement>` 字典并帮它填补上早已规定好的版本。
   **核心价值**：实现全工程组件版本的“大一统”，后期升级基础组件时只需修改顶层 POM 一处即可。同时也规避了各模块各行其是导致类库版本不一而产生的连环“依赖冲突”和“类找不到”等隐患。

---

## 问题二：`<parent>` 标签中的 `<relativePath/>` 和不写有什么区别？

### 问题是什么？
1. **说明问题是什么？**
   在 `pom.xml` 的 `<parent>` 标签中，有时能看到 `<relativePath/>` 被写成空标签，想了解它和完全不写这个标签在执行时有什么不同。
2. **说明问题的上下文是什么？**
   在项目的根 `pom.xml` 中，继承了公司外部提供的基础设施（如 `infrastructure-starter-parent`），并在下面明确加上了 `<relativePath/>` 标签。

### 回答是什么？
1. **涉及到的知识点是什么？**
   - Maven 解析父 POM 的寻址规则与先后顺序
   - `<relativePath>` 标签的含义与默认属性

   **相关代码：**
   ```xml
   <!-- 根 huiju-housepivot-stats/pom.xml 中继承外部父 POM -->
   <parent>
       <groupId>com.lianjia.infrastructure</groupId>
       <artifactId>infrastructure-starter-parent</artifactId>
       <version>2.1.29</version>
       <!-- 指定从仓库中查找父级，跳过本地寻找 -->
       <relativePath/> 
   </parent>
   ```

2. **答案是什么？**
   - **不写 `<relativePath>`（默认行为）**：Maven 会默认优先尝试去本地同级目录的上一级寻找父工程的 POM，即默认相对路径为 `../pom.xml`。如果找不到，才按序去本地仓库和远程仓库下载。这适用于传统的“伞状”本地多模块结构。
   - **写为空标签 `<relativePath/>`**：显式地指示 Maven，当前引用的父工程并不是我们本地源代码目录树里的一部分。此举会让 Maven **跳过在本地相对目录下（也就是上一级目录）盲目地寻找**，直接去本地 Maven 仓库（`~/.m2`）或远程私服/中央仓库去“拉取（Pull）”。
   **核心价值**：专门用于继承二方、三方提供的独立框架或外部骨架时，提供更精准的构建策略，免受本地无意义的相对路径解析产生的警告。
