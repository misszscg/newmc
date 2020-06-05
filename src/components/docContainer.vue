<template>
  <div class="doc" :style="back" v-if="active">
    <div>
      <ul class="navList">
        <li  v-for="(item,index) in menu"
             :class="currentIndex==index ? 'active':''"
             @click="goMenu(index)" :key=index
        >
          <a :href="item.link">{{index+1}}.{{item.name}}</a></li>
        <el-slider class="slider" v-model="value1" vertical height="200px" @change="changebg"></el-slider>
      </ul>
    </div>
    <div ref="scroll">
      <div class="text">
        <b id="text1">一、何为前端工程化</b>
        <ul>
          <li>
            在本公司前端技术团队的日渐壮大,前后端分离表现日渐明显的大背景下,前端团队的相关元素显得比较杂乱.这就导致项目在各个生命周期内都会遇到各种一开始就能避免的问题.比如创建项目时会纠结使用什么技术栈,项目中期到处寻找插件,新找到的插件学习使用又要浪费大把时间,大型项目为命名绞尽脑汁,项目后期维护的时候,接手维护的技术员根本看不懂别人的开发方式等等
          </li>
          <li>
            以上列举的开发中常见的问题,在工程化的规范支持下就能得到良好的规避.那么何为前端工程化,简单的来说就是’套路’,按照既定的’套路’来进行项目的开发就是工程化对象的实例.
          </li>
        </ul>
        <b id="text2">二、前端工程化目标</b>
        <ul>
          <li>IDE统一使用</li>
          <li>SVN上传,更新,解决代码冲突规范化</li>
          <li>代码规范化</li>
          <li>技术栈选用,使用标准化</li>
        </ul>
        <b id="text3">三、IDE相关规范</b>
        <ul>
          <li>
            目前前端使用的IDE按功能集成可以分为三个量级:  <br>
            轻量级:如文本编辑器,editorplus,notepad++, 这一类编辑器适用于新人,几乎没有集成任何功能,便于新人记代码. <br>
            中量级:如 sublimite,DW,H5builder,axsure(项目经理,UI), 这类编辑器集成了大部分前端需求功能,如代码补全,terminal,预编译插件,版本管理等.装上插件甚至支持php,java等语言 相对于重量级IDE,具有启动快的优势,常用于服务器端快速修改代码. <br>
            重量级:webstorm. 作为一款纯前端的重量级插件, 它在重量级插件的基础上更好的支持了框架级别的代码补全,代码检查,更加智能,功能更全面,自定义程度更高, 缺点是占用硬件资源较大,启动慢. <br>
            综合公司的实际情况,目前将IDE统一定为:webstorm. 以下为干货分享: <br>
            下载地址: <a href="https://www.jetbrains.com/webstorm/">https://www.jetbrains.com/webstorm/</a> <br>
            常用快捷键: <a href=" http://www.jb51.net/softjc/232839.html "> http://www.jb51.net/softjc/232839.html </a> <br>
            实用技巧: <a href="https://www.cnblogs.com/guoyong-feng/p/6185218.html ">https://www.cnblogs.com/guoyong-feng/p/6185218.html </a>
          </li>
        </ul>
        <b id="text4"> 四、SVN相关规范 </b>
        <ul>
          <li>
            由于webstorm内部集成有SVN管理模块,所以我们的SVN操作基于webstorm来实现 <br>
            启用SVN模块
            <img src="../../static/project/img/ws1.png" alt="" >
          </li>
          <li>
            update 与 commit <br>
            <img src="../../static/project/img/ws2.png" alt=""> <br>
            这两个按钮对应为update和commit ,默认没有快捷键, 建议自定义两个快捷键 <br>
            <br>
            Commit时请注意以下几点 <br>
            <img src="../../static/project/img/ws3.png" alt="">
            <ul>
              <li>标记<span class="fred">1</span>为提交文件列表,请确认提交文件证件正确性,非项目相关文件请勿提交,特别是.idea这个文件,他是IDE的配置文件,是你自己独有的</li>
              <li>标记<span class="fred">2</span>是代码风格检查,如果代码存在error或者waring 该功能勾选的情况下会弹出确认框问你是否要提交,建议不勾选</li>
              <li>标记<span class="fred">3</span>为代码对比框,提交前请仔细确认你的修改内容,避免覆盖他人代码</li>
            </ul>
          </li>
          <li>冲突处理:
            <br>不管是在update还是在commit阶段都会出现你的代码和服务器代码冲突的情况,		 为了避免冲突的情况发生,请务必做到以下几点:
            <ul>
              <li>在编辑代码前,请先update代码, 务必保证你编辑的代码是最新版本</li>
              <li> 在编辑代码的时候可以尝试锁定代码,方法如下 <br>
                <img src="../../static/project/img/ws4.png" alt=""> <br>
                这样别人就不能在你编辑的时候提交代码,但是请确保跟你协同开发的人员知晓你已锁定代码,否则你可能面临人生安全威胁. 锁定功能会在你点解解锁 或者 提交代码后自动失效.
              </li>
              <li>
                做到以上两点几乎可以避免代码冲突,但是冲突还是无法避免的,当出现冲突时,请按照以下方式处理
                <ul>
                  <li>提交的时候报冲突, 请先update后再提交,如果提交成功表明,svn只是版本号上冲突,代码并没有冲突. update冲突的情况下是不能进入到提交阶段.</li>
                  <li>Update冲突时会弹出以下界面 <br>
                    <img src="../../static/project/img/ws5.png" alt=""> <br>
                    双击列表项(冲突的有时候不止一个文件) 会弹出代码比对界面 <br>
                    <img src="../../static/project/img/ws6.png" alt=""> <br>
                    该界面是不可写入的 左边为本地代码 右边为云端代码 中间为本地代码智能合并结果,此时请仔细阅读云端代码,做出合适的选择. 如果智能合并没有到达你的预期效果,请备份你的本地代码,选择接受云端代码,再把你的代码迁移到云端代码去.
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <b id="text5">五、普通代码书写规范</b>
        <ul style="list-style: none">
          <li>
            首先我们需要规范代码风格,打开IDE设置代码风格 <br>
            <img src="../../static/project/img/ws7.png" alt=""> <br>
            将我们开发常用的语言 缩进值全部设置为4, 这样大家在使用整理代码功能时,生成的代码风格是一致的, 否则你整理一次代码后提交SVN会出现无数个修改点.
            <br> 开发前准备
            <br>
            <br>1.声明H5 !DOCTYPE html
            <br>2.编码格式 chartse=''UTF-8'
            <br>3.页面字体'Microsoft YaHei'
            <br>4.开启视口模式<meta name='viewpoint'>
            <br>5.css样式表必须在头部引用
            <br>HTML书写标准
            <br>
            <br>元素使用原则
            <br>1.元素应使用具有语义化的元素标签
            <br>2.对于组合元素应使用正确且完整的父元素和后代元素
            <br>3.段落分隔符要使用实际对应的p元素，而不是用多个br标签
            <br>4.列表中的条目必须总是放置于ul、ol或dl 中，永远不要用一组 div或p 来表示
            <br>5.给每个表单里的字段加上 label 标签，其中的 for 属性必须和对应的输入字段对应，这样用户就可以点击标签。同理，给标签加上 cursor:pointer; 样式也是明智的做法,且此做法能使盲人用户操作更加便利
            <br>6.在某些闭合的 /div 标签旁边加上一段html注释，说明这里闭合的是什么元素。这在有大量嵌套和缩进的情况下会很有用。
            <br>7.不要把表格用于页面布局,表格渲染机制会占用大量性能
            <br>8.单标签不用写结束符号
            <br>9.标注好每个布局结构的起始点,方便快速定位代码

            <br><br>CSS书写标准
            <br>1.尽量不要写内联样式
            <br>2.命名方式必须语义化,简洁,使用驼峰命名方式.
            <br>主要的 master.css
            <br>模块 module.css
            <br>基本共用 base.css
            <br>布局、版面 layout.css
            <br>主题 themes.css
            <br>专栏 columns.css
            <br>文字 font.css
            <br>表单 forms.css
            <br>补丁 mend.css
            <br>打印 print.css
            <br>3.定义样式的时候，对样式在页面只出现一次的元素用id，其他的用class.
            <br>4.选择器单独占一行，每个属性占一行。属性声明要有缩进.
            <br>5.自己写的z-index的值不能超过 100,
            <br>6.尽最大的努力缩小选择范围,这样就可以提升性能,比如 * 坚决不要使用.
            <br>7.flex 弹性布局兼容性低,请慎重使用,
            <br>8.通常处理后代选择符开销最高，使用字选择符更高效，最好使用下一条代替
            <br>9. 0开头的值可以简写,如0.1px简写 .1px.
            <br>10.尽量使用简写颜色 比如#fff,而不是#ffffff.
            <br>11.0后面不要加单位 比如 width:0px 应写为 width:0.
            <br>12.最后一条样式声明也应该加分号.
            <br>13.浏览器前浏览器私有写法在前，标准写法在后
            <br>14.在理解困难的样式上写注释,这样便于自己修改,也便于团队开发.
            <br>15.使用less开发时,请将less文件也上传到服务器,转译过的CSS开发者自己也不见得认识
            <br>16.一般情况下要优先使用CSS速记格式，一是因为它的简洁，二是用它也可以扩充已有的值，例如margin和padding的情况。 开发者必须注意TRBL 缩写，它表示元素的各边按顺时针方向定义的顺序：上、右、下、左。如果bottom没有定义，它就会从top继承值。同理，如果left未定义，它从right继承值。如果只有top的值有定义，所有的边都会继承那一个值;类似的还有background,animate
            <br>17.放弃雪碧图,使用图标字体,产品在设计之初就选的字体库,这就告别失帧,统一的字体图标库为:阿里图标库,图标由UID选择
            <br>18.避免使用hack,没多大用还费性能,而且我们不再支持IE10 以下的浏览器了.
            <br>19.移动端开发使用rem来解决屏幕适配问题
            <br><br>四:JavaScript书写通用标准
            <br>1.文件夹、文件的命名与命名空间应能代表代码功能，可读性强.
            <br>2.与CSS一样使用驼峰命名方式,后台不能使用驼峰命名,这样我们可以很直观的分辩前后端数据,blur值命名前加is,例如:isShow.
            <br>3.常量大写
            <br>4.ES6语法目前兼容性还不太好,尽量不要在没有编译器的环境下使用
            <br>5.关键词、条件括弧后面使用空格；运算操作符号两侧使用空格；语句分割符‘,’后面使用空格
            <br>6.左大括号"{"可以居行尾，也可写在下行首（独自一行）；右大括号"}"单独占一行，居行首
            <br>7.句末必须用分号结尾
            <br>8.if 语句括号中的条件若过多过长，应予以折行；折行后，||、&& 等符号应与 “(” 后的第一个字母纵向对齐
            <br>例如:  if (condition1
            <br>&& condition2
            <br>|| condition3) {
            <br>}
            <br>9.函数或者类等都要添加头描述,功能尽量写得详细,以便团队阅读.
            <br>例如:   /**
            <br>* 简述
            <br>*
            <br>* 功能详细描述
            <br>*
            <br>* @param String arg1 参数1
            <br>* @param Number arg2 参数2，默认为0
            <br>* @return Boolean看xxx是否成功
            <br>*/
            <br>function fooFunction (arg1, arg2) {
            <br>}
            <br>10.尽量使用===作比较,避免掉入==造成的陷阱, 刻意进行隐式转换时除外.
            <br>11.number to string的转换，建议使用 1 + ''或String(1)，不使用new String(1)或1.toString()的方式,同理string转 number 用 -0的方式
            <br>12.字符串拼接，应使用数组保存字符串片段，使用时调用join方法。避免使用+或+=的方式拼接较长的字符串，每个字符串都会使用一个小的内存片段，过多的内存片段会影响性能.
            <br>13.99%的代码必须封装在外部Javascript文件中。这些文件必须在 BODY 标签的尾部引入，让页面的性能最大化
            <br>14.不要人为缩短命名到最小。除了传统的 for 循环中的计数器 i 等简化的情况，变量命名必须长到有明确意义
            <br>15.任何时候不要省略分号,特别是涉及到需要压缩的项目,没有分号会引起报错
            <br>16.应该在页面顶部定义全局变量,增加后期可维护性
          </li>
        </ul>
        <b id="text6">六、jquery书写规范</b>
        <ul style="list-style: none">
          <li>
            <br>1.jq的类型的变量前面加$
            <br>2.尽量避免使用JQ进行复杂选择,这非常耗性能,document.getElementById('id') 省性能 且兼容所有浏览器,嫌它长可以封装函数
            <br>例如:
            <br>function get(e){
            <br>return 	document.querySelector(e)
            <br>};
            <br>3.避免重复使用同一个选择器,正确的写法应该用把重复使用的选择器定义到变量中,这可以省性能
            <br>4.不要用匿名函数来做事件的回调。匿名函数不易调试维护测试和复用
            <br>5.请使用bind来绑定事件 很多朋友喜欢以下的代码：
            <br>$(".yitip").click(function(){ ........ })
            <br>但在jquery插件开发中更提倡使用bind：
            <br>$(".yitip").bind('click',function(){ ......... })
          </li>
        </ul>
        <b id="text7">七、vue 书写规范</b>
        <ul style="list-style: none">
          <li>
            <br>1.	留住this, this的指向在某些函数的回调中会发生改变,所以在生命周期一开始就应该将this赋予一个组件域变量
            <br>2.  数据处理类API不要使用箭头函数如:data,props,computed,watch,理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例
            <br>3.谨慎使用 this.$refs在大多数情况下，通过 this.$refs 来访问其它组件的上下文是可以避免的。在使用的的时候你需要注意避免调用了不恰当的组件 API，所以应该尽量避免使用 this.$refs

          </li>
        </ul>

        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <br><br>
      </div>
    </div>
    
  </div>
</template>
<script>
  let vm;
  export default {
    name: 'doc',
    data() {
      return {
        value1:100,
        menu:[
          {
            name:'何为前端工程化',
            link:'#text1',
          },
          {
            name:'前端工程化目标',
            link:'#text2',
          },
          {
            name:'IDE相关规范',
            link:'#text3',
          },
          {
            name:'SVN相关规范',
            link:'#text4',
          },
          {
            name:'普通代码书写规范',
            link:'#text5',
          },
          {
            name:'Jquery书写规范',
            link:'#text6',
          },
          {
            name:'Vue书写规范',
            link:'#text7',
          },
          ],
        currentIndex:0,
        back:{},
        active:true
      }
    },
    computed:{
      
    },
    methods: {
      reload(){
        this.active = false
        this.$nextTick(function(){
          this.active = true
        })
      },
      goMenu(index){
        vm.currentIndex=index;
      },
      changebg(){
        let $this = this;
        let k = $this.value1*2.55
        $this.back.background = 'rgb('+k+','+k+','+k+')'
        $this.reload();
      }
    },
    beforeCreate: function () {
      vm = this
    },
    mounted() {

    }
  }
</script>
<style scoped lang="scss">
.slider{
  padding-top: 100px;
}
  img{
    max-width: 100%;
  }
.navList{
  text-align: left;
  list-style: none;
  position: fixed;
  left: 30px;
  top: 40%;
  transform: translateY(-50%);
}
.navList a{
  text-decoration: none;
  color: #333;
  cursor: pointer;
}
.navList li{
  margin-top: 30px;
}
  .navList li.active a{
    color: red;
  }
  .doc {
    height: 100%;
    text-align: left;
    box-sizing: border-box;
    margin-left: 200px;
    b{
      display: inline-block;
      padding-top: 40px;
    }
  }

  .text {
    letter-spacing: 1px;
    ul {
      padding-left: 20px;
      list-style: decimal;
      margin-bottom: 10px;
      li {
        margin-top: 10px;
        letter-spacing: 1px;
        font-size: 14px;
        color: #5e6d82;
        line-height: 1.5em;
      }
    }
  }

  .fred {
    color: red;
    font-weight: 800;
  }
</style>
