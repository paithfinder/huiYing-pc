
<template>
  <div class="sidenav">
        <ul>
            <li><a><span class="bg"></span><span>外汇异动</span></a></li>
            <li><a><span class="bg"></span><span></span></a></li>
        </ul>
    </div>

</template>

<script>
export default {

}
</script>

<style>

        ul, li {
            margin: 0;
            padding: 0;
        }

        .sidenav {
            position: relative;
        }

            .sidenav > ul {
                background: #fff;
                position: fixed;
                top: 2rem;
                right: 0.2rem;
                width: 0.375rem; /* 将宽度减半 */
            }

                .sidenav > ul > li {
                    list-style: none;
                    width: 0.3625rem; /* 将宽度减半 */
                    height: 0.375rem; /* 将高度减半 */
                    cursor: pointer;
                }

                    .sidenav > ul > li > a {
                        display: block;
                        width: 0.175rem; /* 将宽度减半 */
                        height: 0.2375rem; /* 将高度减半 */
                        font-size: 0.0875rem; /* 根据比例调整字体大小 */
                        padding: 0.0625rem 0.1rem; /* 根据比例调整内边距 */
                        position: relative;
                    }

                        .sidenav > ul > li > a::after {
                            position: absolute;
                            width: 0.25rem; /* 将下划线宽度减半 */
                            height: 0.00625rem; /* 根据比例调整下划线高度 */
                            bottom: 0.00625rem; /* 根据比例调整下划线位置 */
                            left: 50%;
                            margin-left: -0.125rem; /* 将下划线宽度减半 */
                            content: "";
                            background: linear-gradient(270deg, white, rgb(238, 238, 238), rgb(238, 238, 238), white);;
                            z-index: 1;
                        }

                        .sidenav > ul > li > a > .bg {
                            position: absolute;
                            top: -0.00625rem; /* 根据比例调整背景位置 */
                            bottom: 0.00625rem; /* 根据比例调整背景位置 */
                            left: 0;
                            right: 0;
                            background: transparent;
                            z-index: 2;
                        }

                    .sidenav > ul > li:hover > a > .bg {
                        background: #0094ff;
                    }
                    .sidenav > ul > li > a >img {
                    display:block;
                    width:0.1125rem; /* 将图像宽度减半 */
                    height:0.1rem; /* 将图像高度减半 */
                    margin:0 auto;
                    position:relative;
                    z-index:3;
                    }
                    .sidenav > ul > li > a > span:last-child {
                       position:relative;
                       z-index:3;
                    }

</style>
