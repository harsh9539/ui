import React, { useCallback, useMemo, useState } from 'react';
import {
  Button,
  Icon,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Flex,
} from '@chakra-ui/react';
import { RadioButtonGroup, RadioButtonOption } from '@fedimint/ui';
import { GuardianRole, SETUP_ACTION_TYPE } from '../types';
import { ReactComponent as ArrowRightIcon } from '../assets/svgs/arrow-right.svg';
import { ReactComponent as CheckIcon } from '../assets/svgs/check.svg';
import { ReactComponent as StarsIcon } from '../assets/svgs/stars.svg';
import { ReactComponent as IntersectSquareIcon } from '../assets/svgs/intersect-square.svg';
import { ReactComponent as WarningIcon } from '../assets/svgs/warning.svg';
import { useSetupContext } from '../hooks';
import { useTranslation } from '@fedimint/utils';

interface Props {
  next: () => void;
}

export const RoleSelector = React.memo<Props>(function RoleSelector({
  next,
}: Props) {
  const { t } = useTranslation();
  const { dispatch } = useSetupContext();
  const [role, setRole] = useState<GuardianRole>();
  const options: RadioButtonOption<GuardianRole>[] = useMemo(
    () => [
      {
        value: GuardianRole.Host,
        label: t('role-selector.leader.label'),
        description: t('role-selector.leader.description'),
        icon: StarsIcon,
      },
      {
        value: GuardianRole.Follower,
        label: t('role-selector.follower.label'),
        description: t('role-selector.follower.description'),
        icon: IntersectSquareIcon,
      },
    ],
    [t]
  );

  const handleNext = useCallback(() => {
    if (!role) return;
    dispatch({ type: SETUP_ACTION_TYPE.SET_ROLE, payload: role });
    next();
  }, [role, dispatch, next]);

  return (
    <Flex direction='column' gap={8} align='left' justify='left' maxWidth={660}>
      <Alert status='warning'>
        <AlertIcon>
          <WarningIcon />
        </AlertIcon>
        <Box>
          <AlertTitle>{t('role-selector.disclaimer-title')}</AlertTitle>
          <AlertDescription>
            {t('role-selector.disclaimer-text')}
          </AlertDescription>
        </Box>
      </Alert>

      <RadioButtonGroup
        options={options}
        value={role}
        onChange={(value) => setRole(value)}
        activeIcon={CheckIcon}
      />

      <div>
        <Button
          width='auto'
          leftIcon={<Icon as={ArrowRightIcon} />}
          isDisabled={!role}
          onClick={handleNext}
        >
          {t('common.next')}
        </Button>
      </div>
    </Flex>
  );
});
