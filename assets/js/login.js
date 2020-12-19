$(function() {
    //点击 去注册账号 的链接
    $('#link_reg').on('click',function() {
        $('.login_box').hide();
        $('.reg_box').show();
    })

    //点击  去登录 
    $('#link_login').on('click',function() {
        $('.reg_box').hide();
        $('.login_box').show();
    })

    //从layui中获取form 对象
    var form = layui.form   //与$ 相似
    // var layer = layer.layer

    //通过 form.verify() 函数自定义校验规则

     form.verify({
         //自定义一个叫 pwd 的 校验规则
         pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格']
     })



     //监听注册表单的提交事件
     $('#from_reg').on('submit',function(e) {
         
        //1.阻止默认行为
        e.preventDefault();
        var data= {username: $('#from_reg [name=username]').val(), password: $('#from_reg [name=password]').val()};
        //2.发起ajax的post请求
        $.post('/api/reguser',data, function(res) {
            if(res.status !==0) {
                // return console.log(res.message);
                return  layer.msg(res.message);

            }
            // console.log('注册成功');
            layer.msg('注册成功');
            //模拟人的点击行为
            $('#link_login').click();
        })
     })

     //监听登录表单的提交事件
     $('#from_login').on('submit', function(e){
         //阻止默认提交行为
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: "POST",
            //快速获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                return  layer.msg("登录失败");

                }
                layer.msg("登录成功");
                //将登录成功得到的 token 字符串 保存到localStorage中
                localStorage.setItem('token',res.token);
                // console.log(res.token);

                //跳转到后台主页
                location.href = '/index.html'
            }

        })
     })
})