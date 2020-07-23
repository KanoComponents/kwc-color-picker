const PALETTE = [
    // blueGrey
    ['#263238', '#37474F', '#455A64', '#546E7A', '#607D8C', '#78909C', '#90A4AE', '#B0BEC5', '#CFD8DC', '#ECEFF1', '#607D8B'],
    // grey
    ['#000000', '#424242', '#616161', '#757575', '#9E9E9F', '#BDBDBD', '#E0E0E0', '#EEEEEE', '#F5F5F5', '#FFFFFF', '#9E9E9E'],
    // brown
    ['#3E2723', '#4E342E', '#5D4037', '#6D4C41', '#795549', '#8D6E63', '#A1887F', '#BCAAA4', '#D7CCC8', '#EFEBE9', '#795548'],
    // deep orange
    ['#BF360C', '#D84315', '#E64A19', '#F4511E', '#FF5723', '#FF7043', '#FF8A65', '#FFAB91', '#FFCCBC', '#FBE9E7', '#FF5722'],
    // orange
    ['#E65100', '#EF6C00', '#F57C00', '#FB8C00', '#FF9801', '#FFA726', '#FFB74D', '#FFCC80', '#FFE0B2', '#FFF3E0', '#FF9800'],
    // Amber
    ['#FF6F00', '#FF8F00', '#FFA000', '#FFB300', '#FFC108', '#FFCA28', '#FFD54F', '#FFE082', '#FFECB3', '#FFF8E1', '#FFC107'],
    // Yellow
    ['#F57F17', '#F9A825', '#FBC02D', '#FDD835', '#FFEB3C', '#FFEE58', '#FFF176', '#FFF59D', '#FFF9C4', '#FFFDE7', '#FFEB3B'],
    // Lime
    ['#827717', '#9E9D24', '#AFB42B', '#C0CA33', '#CDDC3A', '#D4E157', '#DCE775', '#E6EE9C', '#F0F4C3', '#F9FBE7', '#CDDC39'],
    // Light green
    ['#33691E', '#558B2F', '#689F38', '#7CB342', '#8BC34B', '#9CCC65', '#AED581', '#C5E1A5', '#DCEDC8', '#F1F8E9', '#8BC34A'],
    // Green
    ['#1B5E20', '#2E7D32', '#388E3C', '#43A047', '#4CAF51', '#66BB6A', '#81C784', '#A5D6A7', '#C8E6C9', '#E8F5E9', '#4CAF50'],
    // Teal
    ['#004D40', '#00695C', '#00796B', '#00897B', '#009689', '#26A69A', '#4DB6AC', '#80CBC4', '#B2DFDB', '#E0F2F1', '#009688'],
    // Cyan
    ['#006064', '#00838F', '#0097A7', '#00ACC1', '#00BCD5', '#26C6DA', '#4DD0E1', '#80DEEA', '#B2EBF2', '#E0F7FA', '#00BCD4'],
    // Light blue
    ['#01579B', '#0277BD', '#0288D1', '#039BE5', '#03A9F5', '#29B6F6', '#4FC3F7', '#81D4FA', '#B3E5FC', '#E1F5FE', '#03A9F4'],
    // Blue
    ['#0D47A1', '#1565C0', '#1976D2', '#1E88E5', '#2196F4', '#42A5F5', '#64B5F6', '#90CAF9', '#BBDEFB', '#E3F2FD', '#2196F3'],
    // Indigo
    ['#1A237E', '#283593', '#303F9F', '#3949AB', '#3F51B6', '#5C6BC0', '#7986CB', '#9FA8DA', '#C5CAE9', '#E8EAF6', '#3F51B5'],
    // Deep purple
    ['#311B92', '#4527A0', '#512DA8', '#5E35B1', '#673AB8', '#7E57C2', '#9575CD', '#B39DDB', '#D1C4E9', '#EDE7F6', '#673AB7'],
    // Purple
    ['#4A148C', '#6A1B9A', '#7B1FA2', '#8E24AA', '#9C27B1', '#AB47BC', '#BA68C8', '#CE93D8', '#E1BEE7', '#F3E5F5', '#9C27B0'],
    // Pink
    ['#880E4F', '#AD1457', '#C2185B', '#D81B60', '#E91E64', '#EC407A', '#F06292', '#F48FB1', '#F8BBD0', '#FCE4EC', '#E91E63'],
    // Red
    ['#B71C1C', '#C62828', '#D32F2F', '#E53935', '#F44337', '#EF5350', '#E57373', '#EF9A9A', '#FFCDD2', '#FFEBEE', '#FF0000'],
];
export const Material = {};
Material.colors = PALETTE.reduce((acc, column, columnIndex) => {
    column.forEach((color, index) => {
        acc[columnIndex + (index * PALETTE.length)] = color;
    });
    return acc;
}, new Array(PALETTE.length * PALETTE[0].length));
Material.rowSize = PALETTE.length;

export default Material;
