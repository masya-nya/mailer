import React from 'react';
import { MemberPlusSvg, DollarSvg } from '../../../../../shared/svg';
import { COLORS } from '../../../../../shared/lib/consts';
import { AmoActionTypesT } from '../../../../../entities/amo/lib/types';

type AmoIconSelectProps = {
	type: AmoActionTypesT
}

const AmoIconSelect = ({ type }:AmoIconSelectProps):React.JSX.Element => {
	if (type === 'contact') {
		return <MemberPlusSvg width='15' height='15' color={COLORS.font_base_color} />;
	}
	return <DollarSvg width='15' height='15' color={COLORS.font_base_color} />;
};

export default AmoIconSelect;
