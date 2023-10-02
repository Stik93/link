import { describe } from 'manten';
import getNode from 'get-node';

const nodeVersions = [
	'20',
	...(
		process.env.CI
			? [
				'18',
				'16',
				'14',
				'12',
			]
			: []
	),
];

(async () => {
	for (const nodeVersion of nodeVersions) {
		const node = await getNode(nodeVersion);
		await describe(`Node ${node.version}`, ({ runTestSuite }) => {
			runTestSuite(import('./specs/cli.spec'), node.path);
			runTestSuite(import('./specs/link-config.spec'), node.path);
		});
	}
})();
