let shopModel = (function shopModel() {
    //获取数据
    let productBox = document.querySelector('.productBox'),
        navList = document.querySelectorAll('.navbar-nav .nav-item'),
        _data = null,
        cardList = null;
    //获得数据
    let getData = function getData() {

        let xhr = new XMLHttpRequest;
        xhr.open('GET','./json/product.json',false);
        xhr.onreadystatechange =()=> {
			if (xhr.readyState === 4 && xhr.status === 200) {
				_data = JSON.parse(xhr.responseText);
			}
		};
        xhr.send(null);
        
    }
    // debugger;
    // console.log(_data);
    //渲染数据
    let render = function render() {
       let str =``;
       _data.forEach(item => {
           let{
            title, 
            price, 
            time, 
            hot, 
            img
           }=item;
           str+=` <div class="card">
           <img src="${img}" class="card-img-top">
           <div class="card-body">
             <h5 class="card-title">${title}</h5>
             <p class="card-text">价格：${price}</p>
             <p class="card-text">时间：${time}</p>
             <p class="card-text">销量：${hot}</p>
           </div>
         </div>`;  
       });
       productBox.innerHTML = str;
       cardList = document.querySelectorAll('.card');
    }
    //重置其他的标记
    let returnTip=function returnTip(){
        Array.from(navList).forEach(item=>{
            if(item!==this){
                item.flag=-1;
            }
        })
    };
    //点击排序
    let handle = function handle() {
		Array.from(navList).forEach(item => {
			// 给每个LI设置自定义属性FLAG：升降序标识，初始-1
			item.flag = -1;
			item.onclick = function () {
                returnTip.call(this);
                this.flag*=-1;
				let pai = this.getAttribute('data-nav');
				_data.sort((a, b) => {
					a = String(a[pai]).replace(/-/g, '');
					b = String(b[pai]).replace(/-/g, '');
					return (a - b) * this.flag;
				});
				render();
			};
		});
	};
    return {
        init() {
            getData();
            render();
            handle();
        }
    }
})();
shopModel.init();