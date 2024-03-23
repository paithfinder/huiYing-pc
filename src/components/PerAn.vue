<template>
  <div class="wrap">

 <el-select v-model="value" filterable placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <div class="listen_text_box">
            <div class="listen_text_con" >
                风暴又一次咆哮；半掩<br>
                在这摇篮的篷罩和被巾下面，<br>
                我的孩子依然安睡。除去<br>
                格雷戈里的森林和一座秃丘<br>
                再没有任何屏障足以阻挡<br>
                那起自大西洋上的掀屋大风；<br>
                我踱步祈祷已一个时辰，<br>
                因为那巨大阴影笼罩在我心上。<br>
                为这幼女我踱步祈祷了一个时辰，<br>
                耳听着海风呼啸在高塔顶，<br>
                在拱桥下，在泛滥的溪水上，<br>
                在溪上的榆树林中回荡；<br>
                在快乐的迷狂中幻梦<br>
                未来的岁月已经来到：<br>
                踏着狂乱的鼓点舞蹈，<br>
                来自大海残酷的天真。<br>
                愿她被人承认美丽，<br>
                但不至使陌生人的眼光痴迷，<br>
                或使自己在镜前心醉，因为<br>
                一旦生得过分地艳丽，<br>
                便会把美看作是最终的满足，<br>
                从而丧失天性的善良，还可能<br>
                失去推心置腹的莫逆交情，<br>
                永远也找不到一个朋友。<br>
                海伦命定要感到生活平淡，<br>
                后来因一个蠢汉惹来许多麻烦，<br>
                而那从浪花中升起的伟大女王，<br>
                因没有生父而可以自做主张，<br>
                却选中了一个瘸腿铁匠做男人。<br>
                无疑娇贵的女人们喜欢<br>
                吃肉时佐以古怪的生菜冷盘，<br>
                丰饶角因此而被糟蹋罄尽。<br>
                我要让她首先精通礼节；<br>
                心灵不可视为天赐，而是那些<br>
                并不十分美丽的人所挣得；<br>
                而许多曾为美而美的蠢货<br>
                已经将魅力变成了智慧，<br>
                还有不少曾经漫游的穷汉，<br>
                爱恋过并自认为曾被爱恋，<br>
                现在目光已离不开令人欢悦的仁爱。<br><br>
                愿她成为一株繁茂的绿树，<br>
                红雀就好象她全部的思绪，<br>
                没有劳形的事务，只是慷慨地<br>
                四处播送着它们宏亮的鸣啼，<br>
                只是在欢乐中相互嬉逐，<br>
                只是在欢乐中你吵我争。<br>
                呵，但愿她象月桂那样长青<br>
                植根在一个可爱的永恒之处。<br>
                近来，由于我曾喜爱的那些心意<br>
                和我曾赞赏的那种美丽<br>
                皆是昙花一现，我的心灵已枯竭，<br>
                但仍知一旦为仇恨所壅塞<br>
                才定然是最可怕的厄运。<br>
                假如心灵中毫无仇恨，<br>
                那厉风的袭击再烈再猛<br>
                理智的仇恨为害最甚，<br>
                因此教她把观念视为可憎。<br>
                难道我不曾眼见那诞生<br>
                自丰饶角之口的最美丽的女人，<br>
                只因她观念固执的心肠，<br>
                用温和的天性所了解的<br>
                每一种美德和那只羊角<br>
                换取了一只充满愤怒的旧风箱？<br>
                想到此，一切仇恨被驱逐散尽，<br>
                灵魂恢复了根本的天真，<br>
                终于得知那是自娱自乐，<br>
                自慰自安，自惊自吓，<br>
                它自己的美好愿望就是天意；<br>
                尽管每一张面孔都会恼怒，<br>
                每一处风源都会咆哮，或每一组<br>
                风箱都会胀破，但她会依然欢喜。<br>
                还愿她的新郎引她入洞房，<br>
                那里一切寻常，庄重堂皇；<br>
                因为傲慢和仇恨都不过<br>
                是大路两旁零售的杂货。<br>
                除了在风俗和礼仪之中，<br>
                纯真和美丽如何诞生？<br>
                礼仪是丰饶角的别名，<br>
                风俗是繁盛的桂树的名称。
            </div>
        </div>

  </div>

</template>

<script>
export default {
  data () {
    return {
      scrollInterval: null,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  mounted () {
    this.scrollInterval = setInterval(() => {
      const el = this.$el.querySelector('.listen_text_con')
      el.scrollTop += 1
      if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
        clearInterval(this.scrollInterval)
      }
    }, 20) // 调整滚动速度，数值越小滚动越快
  },
  beforeDestroy () {
    clearInterval(this.scrollInterval)
  },

  methods: {
    change () {

    }

  }

}
</script>

<style lang="less" scoped>
.wrap{
  .el-select{
    width:95%;
    margin-left: 0.1rem;

  }
   .listen_text_box{

            width: 100%;
            margin-top:0.1rem;
            .listen_text_con{
            overflow-y: auto;
            height: 300px;
            text-align: justify;
            font-size: 14px;
            line-height: 24px;
            color: white;
            margin-left:0.1rem;
        }
        .listen_text_con::-webkit-scrollbar {
            width: 5px;
        }
        .listen_text_con::-webkit-scrollbar-thumb {
            background-color: #5470c6;
            border-radius: 5px;
        }
        .listen_text_con::-webkit-scrollbar-track {
            background-color: #cec5c5;
            border-radius: 5px;
        }
        }

}

</style>
