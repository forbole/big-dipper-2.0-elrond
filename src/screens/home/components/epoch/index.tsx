import React from 'react';
import classnames from 'classnames';
import numeral from 'numeral';
import { Typography } from '@material-ui/core';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import { Box } from '@components';
import {
  RadialBarChart,
  PolarAngleAxis,
  RadialBar,
  Tooltip,
} from 'recharts';
import { useStyles } from './styles';
import { useEpoch } from './hooks';

const Epoch: React.FC<ComponentDefault> = (props) => {
  const {
    classes, theme,
  } = useStyles();
  const { t } = useTranslation('home');
  const { state } = useEpoch();

  const data = [
    {
      value: (state.roundsPassed * 100) / state.roundsPerEpoch,
      fill: theme.palette.custom.primaryData.three,
    },
  ];

  const circleSize = 200;

  return (
    <Box className={classnames(props.className, classes.root)}>
      <Typography variant="h2" className={classes.label}>
        {t('epoch')}
      </Typography>
      <div className={classes.content}>
        <RadialBarChart
          className={classes.chart}
          width={circleSize}
          height={circleSize}
          cx={circleSize / 2}
          cy={circleSize / 2}
          innerRadius={90}
          outerRadius={90}
          barSize={10}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            label={{
              fill: '#666', position: 'insideStart',
            }}
            background
            dataKey="value"
            cornerRadius={circleSize / 2}
          />
          <Tooltip />
          <text
            x={circleSize / 2}
            y={circleSize / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            className="progress-label"
          >
            <tspan className={classes.chartPercentLabel}>
              {numeral(state.epoch).format('0,0')}
            </tspan>
          </text>

          <text x={(circleSize / 2) - 20} y={(circleSize / 2) + 30}>
            <tspan className={classes.chartLabel}>
              {t('epoch')}
            </tspan>
          </text>
        </RadialBarChart>
        <Typography variant="body2" className={classes.time}>
          <Trans
            i18nKey="home:epochRoundsLeft"
            components={[
              <span className="highlight" />,
            ]}
            values={{
              rounds: numeral(state.roundsPerEpoch - state.roundsPassed).format('0,0'),
            }}
          />
        </Typography>
      </div>
    </Box>
  );
};

export default Epoch;
