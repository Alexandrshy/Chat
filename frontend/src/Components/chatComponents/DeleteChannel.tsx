import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import channelStore from '../../store/channelStore';
import { useGetToken } from '../../store/userStoreActions';
import { ChannelProps } from '../../store/interface';
import { useGetAllChannels, useGetCurrentChannelPopover } from "../../store/channelStoreActions";

export default function DeleteChannel({ open, handleClose }: ChannelProps) {
  const { t } = useTranslation();
  const currentChannelPopoverChannel = channelStore((store) => store.currentChannelPopover);
  const setCurrentChannel = channelStore((store) => store.setCurrentChannel);
  const currentChanne = channelStore((store) => store.currentChannel);
  const token = useGetToken();
  const currentChannelPopover = useGetCurrentChannelPopover();
  const allChannels = useGetAllChannels();

  const deleteChannel = () => {
    axios.delete(`/api/v1/channels/${currentChannelPopover.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    try {
      if (currentChannelPopoverChannel.id === currentChanne.id) {
        setCurrentChannel(allChannels[0]);
      }
    } catch (error) {
      console.error(error);
    }
    handleClose();
  }

  return (
    <Dialog
    open={open}
    onClose={handleClose}
  >
    <DialogTitle>{t('modalWindows.deleteChannel.deleteChannel')}</DialogTitle>
    <DialogContent>
      <DialogContentText sx={{ color: 'black' }}>{t('modalWindows.deleteChannel.confirmation')}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>{t('modalWindows.cancel')}</Button>
      <Button onClick={deleteChannel}>{t('modalWindows.deleteChannel.delete')}</Button>
    </DialogActions>
  </Dialog>
  );
}