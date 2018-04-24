// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import {
  Avatar,
  Icon,
  ShadowView,
  View,
  Text,
  TouchableOpacity,
} from '../../atoms';
import { css } from '../../utils/style';
import { selectUser } from '../../redux/selectors';
import { type User } from '../../Types';

type Props = {
  navigateToEditorScreen: () => mixed,
  user: User,
};

const AVATAR_WIDTH = 30;

const StartConversationButton = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.navigateToEditorScreen}>
      <ShadowView style={styles.cellContainer} radius={0}>
        <Avatar imageURI={props.user.profile_photo} size={AVATAR_WIDTH} />
        <Text color="gray" style={styles.textContainer}>
          Start a conversation...
        </Text>
        <View flexDirection="row">
          <Icon
            name="attachment"
            size="md"
            color="#CFD8DC"
            style={css('marginRight', 10)}
          />
          <Icon name="pen" size="md" color="#CFD8DC" />
        </View>
      </ShadowView>
    </TouchableOpacity>
  );
};

const mapStateToProps = state => ({
  user: selectUser(state),
});

export default connect(mapStateToProps, {})(StartConversationButton);

const styles = StyleSheet.create({
  cellContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E4',
    backgroundColor: 'white',
    alignItems: 'center',
    height: 65,
    paddingHorizontal: 15,
  },
  textContainer: {
    paddingHorizontal: 15,
    flexGrow: 1,
  },
  iconsWrapper: {
    marginLeft: 'auto',
  },
});
