import {
  useState, useEffect,
} from 'react';
import * as R from 'ramda';
import { BlockDetailsState } from './types';

export const fakeData = {
  hash: '76dcaf94b4fa6c5c3e2cd08ed5dd4022602c2ac3f716e24a193254b1b8959b0b',
  epoch: 536,
  nonce: 7728339,
  prevHash: 'a3a8f80e2b2dd057aa452e44d7f43382d2ff1c3bed371f1a86751b19922b271c',
  proposer: 'e5dda275fcf2ee75dd9300d3fb186ae0a38da6dd249b3beefdc4faf5c0a286a178ce09d5f3b33564c712fde891bf49055d186c603785d975064ae6df2043f4f390350cad616ad665a49f6794dff5d0d4ee51c8425d14f895e1b2987c96c2ef00',
  pubKeyBitmap: 'ffffffffffffff7f',
  round: 7729505,
  shard: 0,
  size: 1221,
  sizeTxs: 6167,
  stateRootHash: '86e70f7dcb62581d62e500de8bd159b07bf91486ee80a35958453a7393e1dcac',
  timestamp: 1642494630,
  txCount: 17,
  gasConsumed: 73062000,
  gasRefunded: 0,
  gasPenalized: 0,
  maxGasLimit: 1500000000,
  miniBlocksHashes: [
    'a18c8b2a2a85b179c6ed70c94f799520370739cd80dace450dfb90ea077e7586',
    'e1eca5564ee3f130d63b7dd619e5824ef7946b5ddb2e2bbce28d9c38c44af325',
    'a965c46a92b27732857e561ed91e74f76a2e7d40cf0feb8dfe5f7f959f652f28',
    'd61cb3ab6ab46c6dd8390ed8d0c7674f0881d781f8b6c9d71bf513a71aacd27e',
    '0716f30534d35557509c2cbfa3828290b0e36d7895a6a86aede50267939e1328',
  ],
  validators: [
    'e5dda275fcf2ee75dd9300d3fb186ae0a38da6dd249b3beefdc4faf5c0a286a178ce09d5f3b33564c712fde891bf49055d186c603785d975064ae6df2043f4f390350cad616ad665a49f6794dff5d0d4ee51c8425d14f895e1b2987c96c2ef00',
    'ac617ceb40236a8fbd910bf10f3caaa1d2d0d9b0eda39a050eb7b5d82e9a8e59c6554c5c4e4ca707646c7693cf8f480a59b544a8a753a3591b3168dcd3142d30e635d155987d63514442d6f026c7b2ef411cc75cac2e81404206a662b9d2480e',
    'a087526e4728e3c553a65f57ea86719bb0d29ef05e73503671c89c4f2abd0a36c27f2276eaa401e059c15ce40f0bae08e2f34e95414f8d50051e3011a3b7a7465c04a68bfb3d4bf9a33961642938927ad3cd3104129bc5db76a45cf359085684',
    'd48ac81de8addbbcaccfb428374381a1c412f1352ebc394c514b9543c0dcf6b9447c465c31112b33c042bde6d4970005da274f2f8a5784f1cddf4a64a6f139496968c7d7ca9b013d3615c7715c5fc0c30c79da1d2299f9f0e21068de04acc584',
    '4a922a00bdba355c8b9d555fb01c9fa12be4f544df9727aa1286f8de0181cb4944e5fb48cee743bd5cfc4df44fe2bc0556d14b069b9317d4b37195c24c1c61103650c2fa27074ac5b1fbe8cac0a1ea93c15dff4aaa94e09d2da056cafe5ffc98',
    'ace70c98b8dfb5dca7abe98b9ea6394c6edd8ad21859810fe90f770a97ab690a986e3bed707fcb589422606ea1afa412477c36600ed7593e9a0e8973d84ab3581a15d1727ff9725ecf77dc223321afc59250671c0598a768c18cda00cd27d603',
    'ae41eeca43318dddc13a940a7c69658772b0a988584e8c87e84f1fb296b3710d75b6a56c9e5a8f19d661e4d6fb801e1273782873d8862fdea65464bceb6e2723e6662792c1b19381f07de39fcf41a4340da95c28555a3a9a745b871d0ae5e602',
    'bb6eb11edc3003f36c99ef336adadafd39359e19f99e52135ff3b2722a95639d59305bb82fc996056dc2ac5a5712a213936505077ce6e2d381f96a9ac7259d1938b320828eec68698a3924974944f8d9549fcffa422af51b070c2c5820f9c098',
    'ef3aaaa29f56799cae093d5b2694b12d91cad4e254dbbaa7ed780b91d7f442836a4d37e5d1f3a5e827a35e5fc2be51170213947d526a636bf4add24a5520a763b3c8ec2af95cd17c37099b52a7ca213f50077e832afa9753055ca33fd81c1900',
    'b6ca9af145aa588a0f8f9b5c70f89fd8724350c882aab4087d94e8468d0966160dbc37507f68109e28d91dca2e528716db6e74754e12b0f8ad5ae1e7dc65fa9d78e4a09868554ac6b4590d09e4021689c335ecc4426dc5259d343d15eba5888b',
    'bf4500aad55e72763eee66144a0025f75177620838990403773414ee1d6cc536fc99561600c73ae7bb1a9c41ed640e0321143e26e5e2810e524c5f38b9feb54c3d354cdab742bb96778c78cde55046efbaaa55bd564480301551405919a59b84',
    '910b65091d2901d66493f2dddac8e15a6f70dc94d186031c467b5a724fd1265969eebaae4796835d4a057af620cc6a0cd6516dafb3e870ed9ccc81ffdd93baa8de69d8abe37b0ba3dce8e97d59fb1656e2baccb57963871012dca79e45165180',
    'b15056172a84a8bba17173d7fa86ea43dc4674d410139370f2322c66c23623a1df49609591d4b2dd8c1e0aae30d4ab12c9e21102b5f95aa077aa8e506daa524e25fb91a103528676374e9c35495d1eaaad73a58328de9014cd3cab904db1f580',
    '98dcf9f417401c58f11c59972f31ba6d38d9a0354eca0d93e4f340ed03d6d3260530f49b57b80748a75c28ae15a8e1148361db10f97e7eb56e15bbc5ccb6acdacc6490f144f44fd5f4f3d914de311f807079a093eae0f091a41df10c321b8519',
    '1ca012d08f84b84d2cdce5191b4cc3a9c68227ec00c77361e39c2a05c206de7ff6d9333e44f38adeaeb899a97045c6087dbbca818617fc7671375b205c3cb2815ec03e14763b28e658e21d27c1aa1a0dc6907c2fda1110a14874f4311255818f',
    'ed940bbe987a148584a09dc9ef81121af3690669dbc8f43c6278c499bfc13cca6f72628839ce0883f292f5cc45edfc0b1722dd6107dca2ef5b8644dfcf39ecf116887966d920e30b8808a1621e5aa0144e00a60d7336ddeec4c14d1a2876cc90',
    'b7919ffbeaf5ad612be65460f3b739103947b4ba76c767262c23ce98140bd520afb60c24ecec517e9400c7aa0f8c3508d996caa6f3cfa3eea5912cd86f4616094bf3164f8bf0b102baefbc20920798fad20b5b85099017865633d81bdf142d18',
    '28243f9844d7c9bc79ae656fd0969d66d090ce2eae2b5942a00e316029ffeb263356af61deade8053d2945fa34948b08ae51dbf1ec8feb42288c5d91b8997cd5e0e9e05566401b1f40a5ae853b468e862ff910f7e77b717c961ffb2f86f7e881',
    '089d2f157af11ab94ae4efa58dd9d8e34b5a6ca3471846fef4d697bc53f84459c42ed070d88d97c82fa9652e777e9b04a4c689bbcd1fdab39085603bb06d8ec6fe728720e788c9abfcf5185df0d324228591fefc70da75182debe87ddb98a28b',
    '8c9aecc5a52f2c840fc97639b5cbead614be092326f645aa110684b7d55e5481cb99b563d6c86207d2971bb692bdf617aabda44eab665ce5caf8494e5531f5019def828dddc79501e9ca25b6d760e78b5aeda24332b7ab54d69bc742171a2619',
    '9143c1279e9cdbb5a85703850b8d74856c4b88ccc47b9525f03aa2516d569dfcb7249d172d27b342e6430b5b60a74f192d3bc50869379283283f8c8f4312dca5486ae2c38e7fccc22098899cd3485ef988e13080c2420454489622833628a385',
    '5ccf313d3d2787e08fdd0c81ad9f0363023722bb363ed0ba83ae9e993f6ec898b1859d3c82bf14078c6c1e5a35c5fd16c8f0f8b81826211d156bf8d82f94fd982cd584f7c92479be50c2975cec3bdf8239d366e586fc9ac8a63413c81a18f607',
    '8e20135b306d58619a1c0fdeaeb1e39a858fba1fb1cd92811436abbcfc54f910209330d4cb4517e13791430ed7d49b0b12ce56012b6ee05a917c1ccc83a97ccca30cb2497f8be9a89521f6b27a41595dbaaae0d557328cb842eb908448e4e889',
    'ef227bb22a3250ef849f9543ad4ff1729b10977777d310c4536ec98ad9003999c9b28c996722893bc4e92f37bf72c50be6557e2ed41612e37cb2b74fd360cfa27147086fd86389af135d1d2bd88e9cb743b8624dbdbc5e7c5fa07b851777c987',
    '7902e6743a0bee6671b7ec6d1297496d8c46a477024b24f41849d526b1605473ee848fa371e27db5fbc5bd65062fd00d1102045f5793f7cb0cdb1a7d66cf664600580ebea74ab121c15fe0afe62c504b4d1c44a3395322d0ba7efd33176b0597',
    '5323b6853ce7f95475ffb4676137be32634d532e0961d6ab53dd1a8401c05ded806ccb7cc114b6df10867821c97ef807d2be85ae8eda5276ddb73a6aa16a6502b96f080ba773ebcf6926ee0adfc8b5ebf15a44f65766f2dd35508d3bb023d488',
    '7bc33fba541cf794c88164d4986036afc5dd554b7dee91df256bf034b8311acdcead173dac0c642629e1ba83edf84909a962cc4d782097ba309e6e4e26af66d1c90a680b887e90fbe9a20bee1f7b9ca549b78e8c4fa9784236ca462628f35693',
    '44ec82b09f9376ec00a34a85ad12efd9298945fa6f88ed717a4e085936236cb69c4ef1bcb39cb36e63cd7eb3c54bdb198c43adfe889375adefd4ae37ff8dc98f6945c79b5cda35acee55eb065638d0f8ad86ebe8ea71b417c50622b6c4916304',
    'd53512afed095744b56de16eaa37fbef24e3cf4cb326a614826e25acc47e2254086eac48226c10a8bd5e152b78275a0806b2fb5d2f8bf1ede58c9a3ba0abd5cf4f0e98e0c3680e7dfc4c90a1d4f9d7b409119a971fc0b5d87c66844578acee93',
    '65c6b5c4bf2b670b9d58462d19bbad90fc98bd725bfa9b2e4a4c8418190b3310a5ee58c1706dfe42138c8d53bc3b2a0e9cc3eab0692e03cb6a43e21ed2ab5539222a1655e53bee9edfb11f2a4724fd44e05cc03dcf90943efa5a22472b4ef912',
    'd11474267300d00219596a25829f1b8c505cd1abb8163d41af7f832f100b9e22410a2b698ea066f2df44d6bf98ad9b02dd659a99ccb453e2c628669a5100f025ed5bf6d706290a90b560d75365c1f63cf45ab23d47ad9dd4fc15ba488b40d589',
    '070259f2e39d22c82829570c9b01c7ddb3257996d2450c493aa74736acdfd399169a985b6f3735774d3aa5a121ddaa06d4d731d0c28070901b849cbcac6410a02a580ef625ad6fd02843c8e77efdc3f9a61354b0a5daca9ef586b59157f0968a',
    'ea802c1b95b2a7de63b03c6bff7c2fe83f3f95a3982cde00a99387c9bb4d6c0b11a0e309f3445db605b4c82eb6e5df0816c68ca52aad5392a31256c86637663a4126d2ea193f418454f83d5baae3cc62197c6a6a25deffa58a8c144fdadf7086',
    'e4b92416eb3c49ab628a709f001fca6140d7e7e271667167449745796ea760bb2274167e456d270c45c0e208cd336319ddde4c6fd6fe1ad785ebc1d19aa42a47953be43b0f75fe1e6ca5e6c4c2edcaf3b5d536747282aa14f7ba3b0f404b6119',
    'fbd51328072387e1f14c472e7a6aebbcc28aa2a36b3e629089c4ee25daf213817c504674a9525be38dfb910cadd24a1081b9de02d715856c8c6893e7678c94a15aa08e22df25c90ed40bb82bd7c749b244eb7cf41ca873dbf3f6d92b34f0d491',
    'c29472a9ed4bc98f0fcadac47c0d2a61c3aaa58880011a00a0032ba6657aa04c0993f25734acd653a77dd8a50d08280c86267e42b38eb1fd34d7d0ac8f01efb27e42ad50ef70b66c11ae4a8018d1532b5b151a50f8e9577aad9aed9a896a078e',
    '2d4b18c16fbe83956d2dde4d746fb191da3fdae7b179678f096c23fd5aff19f40d98c4a48fe7694fb4b95233e2df6616e71d09c6ebdbcd9d85c557164a5a45110b0ef886eb6737defb54821b098bba2ff25da885f0b3145a0d33ede739b5110a',
    'e48326eb2717a4896031ed3229532c3770c4b86bec8bafa3d4da09533f5609ac2f170584589709600c22e4d582f59301bae77a952459514993ea9919de261227ed8df7f5407f6eee264ea4803edf5ddba6c469a9b38efc92928b35b4ce4a288c',
    '32198cb140ff629236775a02d35584779484b31d6cb2dac7686ca4add9162e816b410f64e09d6e614af315adf20f3f190c74dfec8060319af21f5577806931afb7830bdd5ec9513fca4a3fa6387240d05a2df8459983a0fcea518f126bbdb515',
    '52ccd201fb8517ffc39a1b20502909e843a1002ee4f9d81b1fe6d95469c7639a292e8f2e46e5f3e3609d214c033cba056cd3e3a742fa728bea4b2b44bc5ca4d3c575cee407e6b9fa6ad34bd660df7a0a15258579c85fa6c95dd943affdda2d13',
    '6a39dfc81ed73f60302304fcc319f57308e9cc966886073db187e0fd5e9fa8a214e70c2a6aec1b227240bc674feaf603fb275baa3974fe9edee1f4aed83ace92318f881d39cc49ef16700a1d1971091d44d7e3c8bbea17ee44e053b6eb865490',
    '131611069ff66692b3a1974e66c0eb06c03a5b616b12c12d6d3cb7f2e3a764c2b81f3a4cc660cd13ea8fa9e6b91ecd048438683ea1199569d6ac1a83cb26c2ddfb34f4ba6b1cbb6e5f689bab5871ddb7f414fdae4f0c0e82fc895c9395190987',
    '9c98468e885a87d332bbde932f1bb4cf236abad04181a41be2976722a595407d9a0ca901392ab37b5fef99395c9c2c1626d3affe52b91b3a2e41d273ae32722d5bc99e0df8f12c41baf8a1926afb033a1304979ce96dc59a339d17f0617ca296',
    '8ee96fcd8aa287ca9dc8ba0f4cfb94e47dd38c74bc2f554f2711f470c01d7caaf765b100e0b4b5c8000e2424e6cff814f2ff2c0909005dc9acd1144b08c032b8da2af2e24d98497f8d3ce21f70ec6ca0cfcb4f22ce5b36bc27cb786bf7cd638a',
    '4eeab766f9b832c133fc3c62446ccc9a72a0ce757843e2c11f04297dd9af317c8e3a07eb09a32a02d00b192aa451c00d32c49dff76448fd4da2d2eb0f08363f53b60bb4d9d4600db39dc7f3b92e6f5875b43726581c201b4506ce4b7fd51b08c',
    '457d1a2843a45413f3c346b4e82fccaf7b9bf8391ce24a1d28b718657e9c23d6076b72b3052bb0e51dc2f784094ec810ee6e85a5779c0d8cb56c8d780429f0fd9a645737d102d9421c3d900cff0e3d68e61328b711c0eddca4d5fbac9f2b3196',
    'c3cb43c2417923d60b73f3a65645ec45f3b53e2b323e802ffbcf464a01b2b1cad21a10c25e98646810877518f7ccd6178826e68ab03901f7dd7160013584f4c617171820b2841b3d0e24d68cedcb7d58bea13e888b19fe67cbd7c4ac8fe3ac13',
    'd943a73a32ebc0ae63f5a6d5b368caca07239d024de7f27b6f46644f90aacd65cc3fa18a8beae1c6cdc2bc081dacf00bcb177340ae33c1551f2e7867a83dbb98fb080ad5f97974fc8b3156dcc12dd70cc05eea9ebd2095c21f79af1c33ddd501',
    '875341006f31b75d1aecda68226f6badd5a42c772bdc79d2a8b4a79461932c5bb958bc585386abce76d0df99f6c3bd069845b70d88df36c6423df61ec832dc99d6749186cad5fdbf2047f9050022046537b0399622f17cc9f5858e0790063408',
    'ba5bfd2b5948a573f5802e25d7191614353acfe50447f930f71f14f71e716827cd499374d916e1a8bb148180fd371800378067d0499cdb2db5a41a080d51cd504dad4aea5d82b8dce3ec7528433ec36e649ae37efc808df3a4c3b47030fa1194',
    'd1e64b89a17a207700f3cecd968f4133444dbc8c24da32ad4ecc640e759affd5b539ee49d0641548e604e4ba4d1a15099c692090f67b7c968b53ce66f4175ec5f13c41a79e38ee7862d7e9b9b85f46011497a8ca6c5d26e38792547bdcea1895',
    'c455096943b1382cd33128f6eeec077172bf3e5d8546e17e24457adc6266debc7e8dca7dc1c1fa6f44abcdd72aff8f0accb43a180f54703ba5b4c8b994b1123e8d56e8045172d5a99a496ec2012a655f4192adbc26a4f763d96f1aa9aebaf082',
    'a4b799752dc995ffcad74ec5ba8f106a2d285f0095164fc2bce861f7f2064dc7d9d5af647b4b0339f3da0f367d8f6e0e019e5bee7be102a0736345a76ce03a0bb4112a97f6285ba48e6f3d3344cffa1574861940ac930402918a7abbdecffe93',
    '5d32c98d956396771761b1af05fb20e019e574241d617eb0a591ea1cfccf4e16830ca8194bdfdcd69cf7fd027788ae049da02bb272bdecc0226b452746a058548e3ed9ea72c68cadcbd729af2c08f25fd73e1b6fb40d5d44b7116ad79321fe88',
    '64321a6d0d2d6d4458d39e7cb6c844730103597458507c6c0e85472a68760922176d1c023af8e5f11d9ea0b6474bd504ebaa74e96ff161ac5c1f1c4cb4e493e6503ae5d0af930eb859dd574724641df6d16e70e94d1a9b8f705361fac7613c91',
    '87d0c4aa0c76c5d8a952c459267ff2011988a46b34a6d6c376de60b81468ea65e43ac6fc641ce053798fb882227dd01974100c5473da8c9424f07014f237e3d436c9eaa0df2bde61fa6527e84b74546113db17eefe280867e5fd045702595909',
    'a340b49fb5f346e3709d48aecbd2507ec570eed3a9ddb96c89fe68130fff3eb85e73b230d4bdd35d4b17e52d2a09aa19d7303b7f92ebe82ff40410f19a92802e0d206f97afcc598fb5629a47702c9241f267e426359d23a9e9743da8874ede82',
    '120c9da599c407acbd255366982ac268442405f43fdef53eb47f6767e4c69d253c77ad55b1aa53c46ffd8058d59a411424c370c505b3fc4fc5914fdb8837e3731f60d1f6c62225f89f27d11e61a7ca9f664eb9ddfb9cdb391d5653f59b8bb40f',
    '58d4c97ef7f33185c60ed49516bccbfe796e0f0bb085b414bce22d957fdc9a380313d75f4b40493a2326547873db040a4a4af21a0bbe7cc149665b4c686ecb9fc6f5343d71a87c0902e642036b062599ab832423e1a409cac712ba1dbf5d8e96',
    '14efa1f86662bfcf82aacbd2c2c597344b57251ccfb42b51eba9938789ef63469fa7e26deac10a4d03367508db0ef11471cb31a75d67ce0668a5951f9bf133bd0b7f8b190518a5e8d1b4feab3105b196b571cff8c807b1ebe41fb394b5369318',
    'a70813161fb30cb91c6d6a2303dc63cc2547de12927c11e404bb1fad82ea846fb68f45933af51330c25f59bc42bd7509c80985190e4f68b6d8f834cef1563b7c9e335166dce516acfc70b839f160052365291b66627bb6475b9e717ba47e8d94',
    '6351bf6ddc1e044792075c04cfb72e1d0db20068813116ba7d1cb48d02f51f6554dc11845a7d6ed902db2ca36c2b0c0440c31f2faa45c1d4ed4a0b9a77dc11696909a678cd1dd72947dce34580c0b22bb070399ac53448d985cf242aafb34609',
    '9673875eaee4c59222f0f0dd2057c29520133129808b78c82aac6b56b1bc49357d726458c0050189f45c722193169c11ad01f1a4cd2006905cef713a81a5bc41039bbb7c24488e92bdaa69db83b88d76069abf5f9ea0f40ae9e90a9a9712d290',
  ],
};

export const useBlockDetails = () => {
  const [state, setState] = useState<BlockDetailsState>({
    loading: true,
    exists: true,
    overview: {
      block: 0,
      hash: '',
      proposer: '',
      timestamp: 0,
      txs: 0,
      gasPenalized: 0,
      gasProvided: 0,
      gasRefunded: 0,
      gasUsed: 0,
      size: 0,
      shard: 0,
    },
    miniBlocks: [],
  });

  useEffect(() => {
    getBlockDetails();
  }, []);

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  const getBlockDetails = () => {
    try {
      const blockData = fakeData;

      handleSetState({
        loading: false,
        overview: {
          block: blockData.round,
          hash: blockData.hash,
          proposer: blockData.proposer,
          timestamp: blockData.timestamp,
          txs: blockData.txCount,
          size: blockData.sizeTxs,
          shard: blockData.shard,
          gasUsed: blockData.gasConsumed,
          gasProvided: blockData.maxGasLimit,
          gasRefunded: blockData.gasRefunded,
          gasPenalized: blockData.gasPenalized,
        },
        miniBlocks: blockData.miniBlocksHashes,
      });
    } catch (error) {
      handleSetState({
        loading: false,
        exists: false,
      });
      console.log(error.message);
    }
  };

  return {
    state,
  };
};
