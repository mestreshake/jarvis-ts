import { Button, Stack, TextField, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useVisitorForm } from '../hooks/useVisitorForm';
import ModeSwitch from './visitorForm/ModeSwitch';
import ExistingVisitorSelect from './visitorForm/ExistingVisitorSelect';
import NewVisitorFields from './visitorForm/NewVisitorFields';
import Feedback from './common/Feedback';
import i18nTexts from '../i18n/i18nTexts';

export default function VisitorForm() {
  const {
    mode,
    form,
    dialog,
    previousVisitors,
    selectedVisitor,
    handleModeChange,
    handleVisitorSelect,
    handleChange,
    handleDateChange,
    handleSubmit,
    handleDateError,
    closeDialog,
  } = useVisitorForm();

  return (
    <>
      <Stack
        component="form"
        onSubmit={handleSubmit}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Box
          sx={{
            flexGrow: 1,
            scrollbarGutter: 'stable',
          }}
        >
          <Stack
            spacing={3}
            sx={{ maxWidth: { xs: '100%', md: 600 }, mx: 'auto' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <ModeSwitch mode={mode} onChange={handleModeChange} />
            </motion.div>

            {dialog.open && dialog.type === 'required' && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12 }}
              >
                <Feedback
                  open={dialog.open}
                  onClose={closeDialog}
                  message={dialog.msg}
                  variant="inline"
                  severity="error"
                />
              </motion.div>
            )}

            {mode === 'existing' ? (
              <ExistingVisitorSelect
                visitors={previousVisitors}
                selectedVisitor={selectedVisitor}
                onChange={handleVisitorSelect}
              />
            ) : (
              <NewVisitorFields
                form={form}
                onFormChange={handleChange}
                onDateChange={handleDateChange}
                onDateError={handleDateError}
              />
            )}

            <TextField
              label="Sala"
              name="room"
              value={form.room}
              onChange={handleChange}
              required
            />
          </Stack>
        </Box>

        <Box
          sx={{ maxWidth: { xs: '100%', md: 600 }, mx: 'auto', width: '100%' }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            style={{ marginTop: 'auto', paddingTop: '16px', flexShrink: 0 }}
          >
            <Button type="submit" variant="contained" size="large" fullWidth>
              {i18nTexts.visitor.register}
            </Button>
          </motion.div>
        </Box>
      </Stack>

      <Feedback
        open={dialog.open && dialog.type !== 'required'}
        onClose={closeDialog}
        message={dialog.msg}
        variant="dialog"
        severity={
          dialog.type === 'error'
            ? 'error'
            : dialog.type === 'success'
              ? 'success'
              : 'info'
        }
        title={i18nTexts.dialogs.attention}
      />
    </>
  );
}
