const helpers = {};

helpers.get_color_for_user = (name) => {
  // This is taken from twitch's js and slightly modified
  const defaultColors = [
    ['Red', '#FF0000'],
    ['Blue', '#0000FF'],
    ['Green', '#00FF00'],
    ['FireBrick', '#B22222'],
    ['Coral', '#FF7F50'],
    ['YellowGreen', '#9ACD32'],
    ['OrangeRed', '#FF4500'],
    ['SeaGreen', '#2E8B57'],
    ['GoldenRod', '#DAA520'],
    ['Chocolate', '#D2691E'],
    ['CadetBlue', '#5F9EA0'],
    ['DodgerBlue', '#1E90FF'],
    ['HotPink', '#FF69B4'],
    ['BlueViolet', '#8A2BE2'],
    ['SpringGreen', '#00FF7F']];
  const n = name.charCodeAt(0) + name.charCodeAt(name.length - 1);
  const color = defaultColors[n % defaultColors.length][1];
  return color;
};

module.exports = helpers;
