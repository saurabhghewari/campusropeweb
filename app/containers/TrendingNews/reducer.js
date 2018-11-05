/*
 *
 * TrendingNews reducer
 *
 */

import { DEFAULT_ACTION } from './constants';
import { getState } from '../../constants/cities';
/* eslint-disable*/
export const initialState = {
  states: getState(),
  selectedState: '',
  trendingNews: [
    {
      id: 1,
      profilePictureUrl:
        'https://cdn.pixabay.com/photo/2016/04/01/12/11/avatar-1300582__340.png',
      userName: 'Pixabay',
      createdOn: 'September 14, 2016',
      headLine:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      pictureUrl:
        'https://static.agorapulse.com/wp-content/uploads/2017/07/What-Facebook-Image-Sizes-1.png',
    },
    {
      id: 2,
      profilePictureUrl: 'https://www.colourbox.dk/preview/23115788-.jpg',
      userName: 'Menneske',
      createdOn: 'September 14, 2018',
      headLine:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      pictureUrl:
        'https://steamcdn-a.akamaihd.net/steam/apps/770460/ss_233685907cea9aca321eda6244ebd8e04d4c459c.1920x1080.jpg?t=1530132030',
    },
    {
      id: 3,
      profilePictureUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI6SVhUc9rYndNlQi8Tzfh3TsqBFrFuGhMyru0K4F0TJaB855z',
      userName: 'Lapins',
      createdOn: 'September 11, 2018',
      headLine:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      pictureUrl:
        'https://steamcdn-a.akamaihd.net/steam/apps/770460/ss_78c25c027f5c45be1b9a1f727f72bb74ada536dc.1920x1080.jpg?t=1530132030',
    },
  ],
};

function trendingNewsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default trendingNewsReducer;
