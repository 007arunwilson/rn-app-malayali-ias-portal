/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import PDFView from 'react-native-view-pdf';
import { color } from '../config';
import FullscreenTextLoader from '../components/miscellaneous/fullscreenTextLoader';
import { useSelector, useDispatch } from 'react-redux';
import { loadNote } from '../store/actions/note';
import FullscreenMessage from '../components/miscellaneous/fullScreenMessage';
import InlineLoader from '../components/miscellaneous/inlineLoader';

const Note = (props) => {
  const dispatch = useDispatch();
  const [pdfError, setPdfError] = React.useState(null);
  const [pdfLoading, setPdfLoading] = React.useState(true);
  const { noteItem } = props;

  const { loading, uri } = useSelector((state) => state.note);

  React.useEffect(() => {
    dispatch(loadNote(noteItem));
  }, [dispatch, noteItem]);

  return loading ? (
    <FullscreenTextLoader />
  ) : uri && !pdfError ? (
    <SafeAreaView style={styles.container}>
      {pdfLoading ? <InlineLoader text={'Preparing document ...'} /> : null}
      <PDFView
        fadeInDuration={250.0}
        style={styles.pdfView}
        resource={uri}
        resourceType={'url'}
        onLoad={() => setPdfLoading(false)}
        onError={(error) => setPdfError(error)}
      />
    </SafeAreaView>
  ) : (
    <FullscreenMessage text={"Error: can't able to load Pdf"} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  pdfView: {
    flex: 1,
  },
});

Note.options = {
  topBar: {
    visible: false,
  },
};

export default Note;
