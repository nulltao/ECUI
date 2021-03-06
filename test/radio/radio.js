describe('控件初始化测试', {
    '通过<input>初始化': function () {
        var el = document.createElement('input');
        el.style.cssText = 'width:20px;height:20px;display:none';
        var ctrl = ecui.create('Radio', {element: el});

        value_of(ctrl.getBase()).should_be(el.parentNode);
        value_of(ctrl.getInput()).should_be(el);
        value_of(ctrl.getWidth()).should_be(20);
        value_of(ctrl.getHeight()).should_be(20);
        value_of(ctrl.getInput().offsetWidth).should_be(0);

        ecui.dispose(ctrl);
    },

    '通过<div>初始化': function () {
        var el = document.createElement('div');
        el.style.cssText = 'width:20px;height:20px;display:none';
        var ctrl = ecui.create('Radio', {element: el});

        value_of(ctrl.getBase()).should_be(el);
        value_of(ctrl.getInput()).should_be(el.firstChild);
        value_of(ctrl.getWidth()).should_be(20);
        value_of(ctrl.getHeight()).should_be(20);
        value_of(ctrl.getInput().offsetWidth).should_be(0);

        ecui.dispose(ctrl);
    },

    '通过<div><input>初始化': function () {
        var el = document.createElement('div'),
            input = document.createElement('input');
        el.style.cssText = 'width:20px;height:20px;display:none';
        el.appendChild(input);
        var ctrl = ecui.create('Radio', {element: el});

        value_of(ctrl.getBase()).should_be(el);
        value_of(ctrl.getInput()).should_be(input);
        value_of(ctrl.getWidth()).should_be(20);
        value_of(ctrl.getHeight()).should_be(20);
        value_of(ctrl.getInput().offsetWidth).should_be(0);

        ecui.dispose(ctrl);
    },

    '指定checked为true': function () {
        var el = document.createElement('div');
        el.id = 'group';
        el.innerHTML = '<div ecui="type:radio;id:item1;name:old"></div>'
            + '<div ecui="type:radio;id:item2;checked:true;name:old"></div>'
            + '<div ecui="type:radio;id:item3;checked:true;name:old"></div>'
        document.body.appendChild(el);
        ecui.init(el);

        value_of(ecui.get('item1').isChecked()).should_be_false();
        value_of(ecui.get('item1').getClass()).should_be('ec-radio');
        value_of(ecui.get('item2').isChecked()).should_be_false();
        value_of(ecui.get('item2').getClass()).should_be('ec-radio');
        value_of(ecui.get('item3').isChecked()).should_be_true();
        value_of(ecui.get('item3').getClass()).should_be('ec-radio-checked');

        var el = document.getElementById('group');
        ecui.setFocused();
        ecui.dispose(el);
        document.body.removeChild(el);
    }
});

describe('单选框功能测试', {
    'before': function () {
        var el = document.createElement('div');
        el.id = 'group';
        el.innerHTML = '<div ecui="type:radio;id:item1;name:old" style="width:10px;height:10px"></div>'
            + '<div ecui="type:radio;id:item2;name:old" style="width:10px;height:10px"></div>'
            + '<div ecui="type:radio;id:item3;name:old" style="width:10px;height:10px"></div>'
            + '<div ecui="type:radio;id:item4;name:old" style="width:10px;height:10px"></div>'
            + '<div ecui="type:radio;id:item5;name:old" style="width:10px;height:10px"></div>';
        document.body.appendChild(el);
        ecui.init(el);
    },

    'after': function () {
        var el = document.getElementById('group');
        ecui.setFocused();
        ecui.dispose(el);
        document.body.removeChild(el);
    },

    '获取同组单选框': function () {
        var item1 = ecui.get('item1'),
            item2 = ecui.get('item2'),
            item3 = ecui.get('item3'),
            item4 = ecui.get('item4'),
            item5 = ecui.get('item5');

        value_of(item1.getItems() === item1.getItems()).should_be_false();
        value_of(item1.getItems()).should_be([item1, item2, item3, item4, item5]);
        value_of(item2.getItems()).should_be([item1, item2, item3, item4, item5]);
        value_of(item3.getItems()).should_be([item1, item2, item3, item4, item5]);
        value_of(item4.getItems()).should_be([item1, item2, item3, item4, item5]);
        value_of(item5.getItems()).should_be([item1, item2, item3, item4, item5]);
    },

    '选项名称为空不分组(getName/setName)': function () {
        var item1 = ecui.get('item1'),
            item2 = ecui.get('item2'),
            item3 = ecui.get('item3'),
            item4 = ecui.get('item4'),
            item5 = ecui.get('item5');

        value_of(item1.getItems()).should_be([item1, item2, item3, item4, item5]);

        item5.setName();
        value_of(item5.getItems()).should_be([item5]);
        value_of(item1.getItems()).should_be([item1, item2, item3, item4]);

        item4.setName();
        value_of(item4.getItems()).should_be([item4]);
        value_of(item1.getItems()).should_be([item1, item2, item3]);
    },

    '在未选中时改变选项名称(getName/setName)': function () {
        var item1 = ecui.get('item1'),
            item2 = ecui.get('item2'),
            item3 = ecui.get('item3'),
            item4 = ecui.get('item4'),
            item5 = ecui.get('item5');

        item5.setName('new');
        item4.setName('new');

        value_of(item1.isChecked()).should_be_false();
        value_of(item2.isChecked()).should_be_false();
        value_of(item3.isChecked()).should_be_false();
        value_of(item4.isChecked()).should_be_false();
        value_of(item5.isChecked()).should_be_false();
    },

    '选中状态控制(checked/isChecked)': function () {
        var item1 = ecui.get('item1'),
            item2 = ecui.get('item2');

        item2.checked();
        value_of(item2.isChecked()).should_be_true();
        value_of(item1.isChecked()).should_be_false();
        value_of(baidu.dom.hasClass(item2.getBase(), 'ec-radio-checked')).should_be_true();
        value_of(baidu.dom.hasClass(item1.getBase(), 'ec-radio-checked')).should_be_false();

        uiut.MockEvents.mousedown(item1.getBase());
        uiut.MockEvents.mouseup(item1.getBase());
        value_of(item1.isChecked()).should_be_true();
        value_of(item2.isChecked()).should_be_false();
        value_of(baidu.dom.hasClass(item1.getBase(), 'ec-radio-checked')).should_be_true();
        value_of(baidu.dom.hasClass(item2.getBase(), 'ec-radio-checked')).should_be_false();

        ecui.setFocused(item2);
        uiut.MockEvents.keydown(item2.getBase(), 32);
        uiut.MockEvents.keyup(item2.getBase(), 32);
        value_of(item2.isChecked()).should_be_true();
        value_of(item1.isChecked()).should_be_false();
        value_of(baidu.dom.hasClass(item2.getBase(), 'ec-radio-checked')).should_be_true();
        value_of(baidu.dom.hasClass(item1.getBase(), 'ec-radio-checked')).should_be_false();
    }
});
