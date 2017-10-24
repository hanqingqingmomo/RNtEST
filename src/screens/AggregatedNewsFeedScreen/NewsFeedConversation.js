// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Avatar, Icon, ShadowView, View, TableView } from '../../atoms';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';
import { selectUser } from '../../redux/selectors';

const { Cell } = TableView;
const AVATAR_WIDTH = 30;

const NewsFeedConversation = props => {
  const { user } = props;

  return (
    <ShadowView style={styles.cellContainer} radius={0}>
      <Cell
        {...props}
        title="Start a conversation..."
        titleTextColor={getColor('gray')}
        image={
          <View style={styles.container}>
            <Avatar imageURI={user.profile_photo} size={AVATAR_WIDTH} />
          </View>
        }
        cellAccessoryView={
          <View style={styles.container}>
            <Icon
              name="attachment"
              size="md"
              color="#CFD8DC"
              style={css('marginRight', 10)}
            />
            <Icon name="pen" size="md" color="#CFD8DC" />
          </View>
        }
        disableImageResize
      />
    </ShadowView>
  );
};

const mapStateToProps = state => ({
  user: selectUser(state),
});

export default connect(mapStateToProps)(NewsFeedConversation);

const styles = StyleSheet.create({
  cellContainer: {
    backgroundColor: getColor('white'),
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E4',
  },

  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 65,
  },
});
