import { createFromIconfontCN } from '@ant-design/icons';

const CustomIconFont = createFromIconfontCN({
  scriptUrl: [
    'iconfont.js', // icon-map
    // '//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js', // icon-shoppingcart, icon-python
  ],
});
export default CustomIconFont;

