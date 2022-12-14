import React from 'react';
import Icon from './Icon';
import { ReactComponent as addSvg } from '@/assets/icons/icon-add.svg';
import { ReactComponent as editSvg } from '@/assets/icons/icon-edit.svg';
import { ReactComponent as saveSvg } from '@/assets/icons/icon-save.svg';
import { ReactComponent as auditSvg } from '@/assets/icons/icon-audit.svg';
import { ReactComponent as importSvg } from '@/assets/icons/icon-import.svg';
import { ReactComponent as exportSvg } from '@/assets/icons/icon-export.svg';
import { ReactComponent as batchSvg } from '@/assets/icons/icon-batch.svg';
import { ReactComponent as copySvg } from '@/assets/icons/icon-copy.svg';
import { ReactComponent as uploadSvg } from '@/assets/icons/icon-upload.svg';
import { ReactComponent as pictureSvg } from '@/assets/icons/icon-picture.svg';
import { ReactComponent as upSvg } from '@/assets/icons/icon-up.svg';
import { ReactComponent as downSvg } from '@/assets/icons/icon-down.svg';
import { ReactComponent as leftSvg } from '@/assets/icons/icon-left.svg';
import { ReactComponent as deleteSvg } from '@/assets/icons/icon-delete.svg';
import { ReactComponent as cancelSvg } from '@/assets/icons/icon-cancel.svg';
import { ReactComponent as closeSvg } from '@/assets/icons/icon-close.svg';
import { ReactComponent as submitSvg } from '@/assets/icons/icon-submit.svg';
import { ReactComponent as resetSvg } from '@/assets/icons/icon-reset.svg';
import { ReactComponent as permissionsSvg } from '@/assets/icons/icon-permissions.svg';
import { ReactComponent as setSvg } from '@/assets/icons/icon-set.svg';
import { ReactComponent as codeSvg } from '@/assets/icons/icon-code.svg';
import { ReactComponent as transferSvg } from '@/assets/icons/icon-transfer.svg';
import { ReactComponent as shelvesSvg } from '@/assets/icons/icon-shelves.svg';
import { ReactComponent as theShelvesSvg } from '@/assets/icons/icon-theShelves.svg';
import { ReactComponent as recommendedSvg } from '@/assets/icons/icon-recommended.svg';
import { ReactComponent as couponsSvg } from '@/assets/icons/icon-coupons.svg';
import { ReactComponent as recycleSvg } from '@/assets/icons/icon-recycle.svg';
import { ReactComponent as printSvg } from '@/assets/icons/icon-print.svg';
import { ReactComponent as searchSvg } from '@/assets/icons/icon-search.svg';
import { ReactComponent as goodsSvg } from '@/assets/icons/icon-goods.svg';
import { ReactComponent as settlementSvg } from '@/assets/icons/icon-settlement.svg';
import { ReactComponent as bindSvg } from '@/assets/icons/icon-bind.svg';
import { ReactComponent as activeSvg } from '@/assets/icons/icon-active.svg';
import { ReactComponent as commentSvg } from '@/assets/icons/icon-comment.svg';
import { ReactComponent as iphoneSvg } from '@/assets/icons/icon-iphone.svg';
import { ReactComponent as mailSvg } from '@/assets/icons/icon-mail.svg';
import { ReactComponent as workflowshow } from '@/assets/icons/icon-workflowshow.svg';
import { ReactComponent as workflowdesign } from '@/assets/icons/icon-workflowdesign.svg';
import { ReactComponent as workflowhang } from '@/assets/icons/icon-workflowhang.svg';
import { ReactComponent as workflowdeploy } from '@/assets/icons/icon-workflowdeploy.svg';
import { ReactComponent as billSvg } from '@/assets/icons/icon-bill.svg';
import { ReactComponent as invalidSvg } from '@/assets/icons/icon-invalid.svg';
import { ReactComponent as userSvg } from '@/assets/icons/icon-user.svg';
import { ReactComponent as generateSvg } from '@/assets/icons/icon-generate.svg';
import { ReactComponent as refreshSvg } from '@/assets/icons/icon-refresh.svg';
import { ReactComponent as userDefaultSvg } from '@/assets/icons/icon-user-default.svg';
import { ReactComponent as downloadSvg } from '@/assets/icons/icon-download.svg';
import { ReactComponent as storehouse } from '@/assets/icons/icon-storehouse.svg';
import { ReactComponent as reload } from '@/assets/icons/icon-reload.svg';
import { ReactComponent as minusSquare } from '@/assets/icons/icon-MinusSquare.svg';
import { ReactComponent as swapSvg } from '@/assets/icons/icon-swap.svg';
import { ReactComponent as staroutlinedSvg } from '@/assets/icons/icon-staroutlined.svg';
import { ReactComponent as starfilledSvg } from '@/assets/icons/icon-starfilled.svg';
import { ReactComponent as fullscreenSvg } from '@/assets/icons/icon-fullscreen.svg';
import { ReactComponent as fullscreenexitSvg } from '@/assets/icons/icon-fullscreenexit.svg';
import { ReactComponent as logoutSvg } from '@/assets/icons/icon-logout.svg';
import { ReactComponent as bellSvg } from '@/assets/icons/icon-bell.svg';
import { ReactComponent as appstoreSvg } from '@/assets/icons/icon-appstore.svg';
import { ReactComponent as menuSvg } from '@/assets/icons/icon-menu.svg';
import { ReactComponent as rightSvg } from '@/assets/icons/icon-right.svg';
import { ReactComponent as wrongSvg } from '@/assets/icons/icon-wrong.svg';
import { ReactComponent as checkcircleSvg } from '@/assets/icons/icon-checkcircle.svg';
import { ReactComponent as questioncircleSvg } from '@/assets/icons/icon-questioncircle.svg';
import { ReactComponent as closecircleSvg } from '@/assets/icons/icon-closecircle.svg';

import { ReactComponent as doubleleftSvg } from '@/assets/icons/icon-doubleleft.svg';
import { ReactComponent as doublerightSvg } from '@/assets/icons/icon-doubleright.svg';
import { ReactComponent as formSvg } from '@/assets/icons/icon-form.svg';
import { ReactComponent as eyeSvg } from '@/assets/icons/icon-eye.svg';
import { ReactComponent as dashboardSvg } from '@/assets/icons/icon-dashboard.svg';
import { ReactComponent as loadingSvg } from '@/assets/icons/icon-loading.svg';
import { ReactComponent as heartSvg } from '@/assets/icons/icon-heart.svg';
import { ReactComponent as sendSvg } from '@/assets/icons/icon-send.svg';
import { ReactComponent as shareSvg } from '@/assets/icons/icon-share.svg';
import { ReactComponent as messageSvg } from '@/assets/icons/icon-message.svg';
import { ReactComponent as lockSvg } from '@/assets/icons/icon-lock.svg';
import { ReactComponent as distrbutionLined } from '@/assets/icons/DistrbutionLined.svg';
import { ReactComponent as invoicingLinedSvg } from '@/assets/icons/icon-InvoicingLined.svg';
import { ReactComponent as InfoCircleLined } from '@/assets/icons/InfoCircleLined.svg';

/**
 * @interface IconProps
 * @param component: any;
 */
interface IconProps {
  component: any;
}
// const Icon = (props: IconProps) => {
//   return <span className='el-icon'>{props.component}</span>;
// };
import './style.less';
// ---------------- ????????????  ----------------

/**
 * * * * * * * * * * * * * * * * * * * * * * 
 * blue
 * * * * * * * * * * * * * * * * * * * * * * 
 */
const DistrbutionLinedBlue = (props) => (
  <Icon
    component={distrbutionLined}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ??????????????????(??????)
const InvoicingLinedBlue = (props) => (
  <Icon
    component={invoicingLinedSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ??????????????????
const DownloadBlue = (props) => (
  <Icon
    component={downloadSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ??????????????????
const AddBlue = (props) => (
  <Icon
    component={addSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ??????????????????
const GenerateBlue = (props) => (
  <Icon
    component={generateSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ??????????????????
const EditBlue = (props) => (
  <Icon
    component={editSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ??????????????????
const SaveBlue = (props) => (
  <Icon
    component={saveSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ??????????????????
const AuditBlue = (props) => (
  <Icon
    component={auditSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ??????????????????
const ImportBlue = (props) => (
  <Icon
    component={importSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ??????????????????
const ExportBlue = (props) => (
  <Icon
    component={exportSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ??????????????????
const BatchBlue = (props) => (
  <Icon
    component={batchSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ??????????????????
const CopyBlue = (props) => (
  <Icon
    component={copySvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ??????????????????
const UpBlue = (props) => (
  <Icon
    component={upSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ???????????????
const DownBlue = (props) => (
  <Icon
    component={downSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ???????????????
const LeftBlue = (props) => (
  <Icon
    component={leftSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ???????????????
const SubmitBlue = (props) => (
  <Icon
    component={submitSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ???????????????????????????
const RefreshBlue = (props) => (
  <Icon
    component={resetSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ??????????????????
const UploadBlue = (props) => (
  <Icon
    component={uploadSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ??????????????????
const PictureBlue = (props) => (
  <Icon
    component={pictureSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ????????????????????????
const PermissionsBlue = (props) => (
  <Icon
    component={permissionsSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ??????????????????
const SetBlue = (props) => (
  <Icon
    component={setSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ??????????????????
const PrintBlue = (props) => (
  <Icon
    component={printSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ??????????????????
const BillBlue = (props) => (
  <Icon
    component={billSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ????????????????????????
const BillWhite = (props) => (
  <Icon
    component={billSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ????????????????????????
const SearchBlue = (props) => (
  <Icon
    component={searchSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ??????????????????
const BindBlue = (props) => (
  <Icon
    component={bindSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ??????????????????
const ActiveBlue = (props) => (
  <Icon
    component={activeSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ??????????????????
const CommentBlue = (props) => (
  <Icon
    component={commentSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ??????????????????
const IphoneBlue = (props) => (
  <Icon
    component={iphoneSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // APP????????????
const MailBlue = (props) => (
  <Icon
    component={mailSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ?????????????????????
const WorkflowShowBlue = (props) => (
  <Icon
    component={workflowshow}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ????????????????????????
const WorkflowDesignBlue = (props) => (
  <Icon
    component={workflowdesign}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ????????????????????????
const WorkflowDeployBlue = (props) => (
  <Icon
    component={workflowdeploy}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ????????????????????????

const StoreHouseBlue = (props) => (
  <Icon
    component={storehouse}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); //??????????????????
const ReloadBlue = (props) => (
  <Icon
    component={reload}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); //??????????????????
const MinusSquare = (props) => (
  <Icon
    component={minusSquare}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); //????????????????????????
const InfoCircleLinedBlue = (props) => (
  <Icon
    component={InfoCircleLined}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); //??????????????????
const CancelBlue = (props) => (
  <Icon
    component={cancelSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ??????????????????

/**
 * * * * * * * * * * * * * * * * * * * * * * 
 * Cyan
 * * * * * * * * * * * * * * * * * * * * * * 
 */
const AuditCyan = (props) => (
  <Icon
    component={auditSvg}
    {...props}
    className={`el-icon-cyan ${props.className}`}
  />
); // ???????????????????????????
const UserCyan = (props) => (
  <Icon
    component={userSvg}
    {...props}
    className={`el-icon-cyan ${props.className}`}
  />
); //??????????????????
const DefaultUserCyan = (props) => (
  <Icon
    component={userDefaultSvg}
    {...props}
    className={`el-icon-cyan ${props.className}`}
  />
);
const SubmitCyan = (props) => (
  <Icon
    component={submitSvg}
    {...props}
    className={`el-icon-cyan ${props.className}`}
  />
); // ???????????????????????????
const CodeCyan = (props) => (
  <Icon
    component={codeSvg}
    {...props}
    className={`el-icon-cyan ${props.className}`}
  />
); // ?????????????????????
const TransferCyan = (props) => (
  <Icon
    component={transferSvg}
    {...props}
    className={`el-icon-cyan ${props.className}`}
  />
); // ??????????????????
const ShelvesCyan = (props) => (
  <Icon
    component={shelvesSvg}
    {...props}
    className={`el-icon-cyan ${props.className}`}
  />
); // ??????????????????
const PermissionsCyan = (props) => (
  <Icon
    component={permissionsSvg}
    {...props}
    className={`el-icon-cyan ${props.className}`}
  />
); // ???????????????????????????
const CouponsCyan = (props) => (
  <Icon
    component={couponsSvg}
    {...props}
    className={`el-icon-cyan ${props.className}`}
  />
); // ?????????????????????

/**
 * * * * * * * * * * * * * * * * * * * * * * 
 * Yellow
 * * * * * * * * * * * * * * * * * * * * * * 
 */
const RecommendedYellow = (props) => (
  <Icon
    component={recommendedSvg}
    {...props}
    className={`el-icon-yellow ${props.className}`}
  />
); // ??????????????????
const GoodsYellow = (props) => (
  <Icon
    component={goodsSvg}
    {...props}
    className={`el-icon-yellow ${props.className}`}
  />
); // ??????????????????
const StarFilledYellow = (props) => (
  <Icon
    component={starfilledSvg}
    {...props}
    className={`el-icon-yellow ${props.className}`}
  />
); // ??????????????????
const WorkflowHangYellow = (props) => (
  <Icon
    component={workflowhang}
    {...props}
    className={`el-icon-yellow ${props.className}`}
  />
); // ????????????????????????

/**
 * * * * * * * * * * * * * * * * * * * * * * 
 * Red
 * * * * * * * * * * * * * * * * * * * * * * 
 */
const DeleteRed = (props) => (
  <Icon
    component={deleteSvg}
    {...props}
    className={`el-icon-red ${props.className}`}
  />
); // ??????????????????
const RecycleRed = (props) => (
  <Icon
    component={recycleSvg}
    {...props}
    className={`el-icon-red ${props.className}`}
  />
); // ?????????????????????
const TheShelvesRed = (props) => (
  <Icon
    component={theShelvesSvg}
    {...props}
    className={`el-icon-red ${props.className}`}
  />
); // ??????????????????
const CancelRed = (props) => (
  <Icon
    component={cancelSvg}
    {...props}
    className={`el-icon-red ${props.className}`}
  />
); // ??????????????????
const CloseRed = (props) => (
  <Icon
    component={closeSvg}
    {...props}
    className={`el-icon-red ${props.className}`}
  />
); // ??????????????????
const RefreshRed = (props) => (
  <Icon
    component={resetSvg}
    {...props}
    className={`el-icon-red ${props.className}`}
  />
); // ??????????????????
const InvalidRed = (props) => (
  <Icon
    component={invalidSvg}
    {...props}
    className={`el-icon-red ${props.className}`}
  />
); // ??????????????????

/**
 * * * * * * * * * * * * * * * * * * * * * * 
 * Black
 * * * * * * * * * * * * * * * * * * * * * * 
 */
const SearchBlack = (props) => (
  <Icon
    component={searchSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ??????????????????
const SendBlack = (props) => (
  <Icon
    component={sendSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ??????????????????
const MessageBlack = (props) => (
  <Icon
    component={messageSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ??????????????????
const LockBlack = (props) => (
  <Icon
    component={lockSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ??????????????????
const ShareBlack = (props) => (
  <Icon
    component={shareSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ??????????????????
const EyeBlack = (props) => (
  <Icon
    component={eyeSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ??????????????????
const DashboardBlack = (props) => (
  <Icon
    component={dashboardSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ?????????????????????
const LoadingBlack = (props) => (
  <Icon
    component={loadingSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ?????????????????????
const HeartBlack = (props) => (
  <Icon
    component={heartSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ???????????????
const FormBlack = (props) => (
  <Icon
    component={formSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ??????????????????
const QuestioncircleBlack = (props) => (
  <Icon
    component={questioncircleSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ????????????????????????
const ClosecircleBlack = (props) => (
  <Icon
    component={closecircleSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ????????????????????????
const CheckcircleBlack = (props) => (
  <Icon
    component={checkcircleSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ????????????????????????
const DoubleleftBlack = (props) => (
  <Icon
    component={doubleleftSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ????????????????????????
const DoublerightBlack = (props) => (
  <Icon
    component={doublerightSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ????????????????????????
const CloseBlack = (props) => (
  <Icon
    component={closeSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ??????????????????
const WrongBlack = (props) => (
  <Icon
    component={wrongSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ???????????????
const RightBlack = (props) => (
  <Icon
    component={rightSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ???????????????
const MenuBlack = (props) => (
  <Icon
    component={menuSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ??????????????????
const AddBlack = (props) => (
  <Icon
    component={addSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ??????????????????
const UserBlack = (props) => (
  <Icon
    component={userSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ??????????????????
const LogoutBlack = (props) => (
  <Icon
    component={logoutSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ??????????????????
const StaroutlinedBlack = (props) => (
  <Icon
    component={staroutlinedSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ??????????????????
const SetBlack = (props) => (
  <Icon
    component={setSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ??????????????????
const SwapBlack = (props) => (
  <Icon
    component={swapSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ????????????????????????
const ExportBlack = (props) => (
  <Icon
    component={exportSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ??????????????????
const PrintBlack = (props) => (
  <Icon
    component={printSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ??????????????????
const UpBlack = (props) => (
  <Icon
    component={upSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ???????????????
const DownBlack = (props) => (
  <Icon
    component={downSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ???????????????
const UploadBlack = (props) => (
  <Icon
    component={uploadSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ???????????????

const LeftBlack = (props) => (
  <Icon
    component={leftSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ???????????????
const CancelBlack = (props) => (
  <Icon
    component={cancelSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ??????????????????
const DeleteBlack = (props) => (
  <Icon
    component={deleteSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ??????????????????
const RefreshBlack = (props) => (
  <Icon
    component={refreshSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ??????????????????
const AppstoreBlack = (props) => (
  <Icon
    component={appstoreSvg}
    {...props}
    className={`el-icon-black ${props.className}`}
  />
); // ??????????????????

/**
 * * * * * * * * * * * * * * * * * * * * * * 
 * white
 * * * * * * * * * * * * * * * * * * * * * * 
 */
const DistrbutionLinedWhite = (props) => (
  <Icon
    component={distrbutionLined}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????????????????
const InvoicingLinedWhite = (props) => (
  <Icon
    component={invoicingLinedSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const AddWhite = (props) => (
  <Icon
    component={addSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const BellWhite = (props) => (
  <Icon
    component={bellSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const MenuWhite = (props) => (
  <Icon
    component={menuSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const EditWhite = (props) => (
  <Icon
    component={editSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const SaveWhite = (props) => (
  <Icon
    component={saveSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const AuditWhite = (props) => (
  <Icon
    component={auditSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const ImportWhite = (props) => (
  <Icon
    component={importSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const ExportWhite = (props) => (
  <Icon
    component={exportSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const BatchWhite = (props) => (
  <Icon
    component={batchSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const CopyWhite = (props) => (
  <Icon
    component={copySvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const UpWhite = (props) => (
  <Icon
    component={upSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ???????????????
const DownWhite = (props) => (
  <Icon
    component={downSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ???????????????
const LeftWhite = (props) => (
  <Icon
    component={leftSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ???????????????
const DeleteWhite = (props) => (
  <Icon
    component={deleteSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const CancelWhite = (props) => (
  <Icon
    component={cancelSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const CloseWhite = (props) => (
  <Icon
    component={closeSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const SubmitWhite = (props) => (
  <Icon
    component={submitSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ???????????????????????????
const UploadWhite = (props) => (
  <Icon
    component={uploadSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const PictureWhite = (props) => (
  <Icon
    component={pictureSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ????????????????????????
const RefreshWhite = (props) => (
  <Icon
    component={refreshSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const PermissionsWhite = (props) => (
  <Icon
    component={permissionsSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const SetWhite = (props) => (
  <Icon
    component={setSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const CodeWhite = (props) => (
  <Icon
    component={codeSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ?????????????????????
const FullscreenWhite = (props) => (
  <Icon
    component={fullscreenSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const FullscreenexitWhite = (props) => (
  <Icon
    component={fullscreenexitSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const TransferWhite = (props) => (
  <Icon
    component={transferSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const ShelvesWhite = (props) => (
  <Icon
    component={shelvesSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const TheShelvesWhite = (props) => (
  <Icon
    component={theShelvesSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const RecommendedWhite = (props) => (
  <Icon
    component={recommendedSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const CouponsWhite = (props) => (
  <Icon
    component={couponsSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ?????????????????????
const RecycleWhite = (props) => (
  <Icon
    component={recycleSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ?????????????????????
const PrintWhite = (props) => (
  <Icon
    component={printSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const SearchWhite = (props) => (
  <Icon
    component={searchSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????
const GoodsWhite = (props) => (
  <Icon
    component={goodsSvg}
    {...props}
    className={`el-icon-white ${props.className}`}
  />
); // ??????????????????

const QRCodeBlue = (props) => (
  <Icon
    component={codeSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ????????????????????? ???????????? ?????????

const RecycleBlue = (props) => (
  <Icon
    component={recycleSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ??????????????? ???????????? ?????????

const SettlementBlue = (props) => (
  <Icon
    component={settlementSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ?????? ????????????

const TransferBlue = (props) => (
  <Icon
    component={transferSvg}
    {...props}
    className={`el-icon-blue ${props.className}`}
  />
); // ?????? ????????????????????????

export {
  DownloadBlue,
  AddBlue,
  EditBlue,
  SaveBlue,
  AuditBlue,
  ImportBlue,
  ExportBlue,
  BatchBlue,
  CopyBlue,
  UpBlue,
  DownBlue,
  LeftBlue,
  SubmitBlue,
  RefreshBlue,
  UploadBlue,
  PictureBlue,
  PermissionsBlue,
  SetBlue,
  PrintBlue,
  SearchBlue,
  BindBlue,
  ActiveBlue,
  WorkflowShowBlue,
  WorkflowDesignBlue,
  WorkflowDeployBlue,
  BillBlue,
  BillWhite,
  SubmitCyan,
  CodeCyan,
  TransferCyan,
  ShelvesCyan,
  PermissionsCyan,
  CouponsCyan,
  RecommendedYellow,
  GoodsYellow,
  DeleteRed,
  RecycleRed,
  TheShelvesRed,
  CancelRed,
  CloseRed,
  ExportBlack,
  PrintBlack,
  UpBlack,
  DownBlack,
  LeftBlack,
  CancelBlack,
  SearchBlack,
  DeleteBlack,
  SetBlack,
  AddWhite,
  EditWhite,
  SaveWhite,
  AuditWhite,
  ImportWhite,
  ExportWhite,
  BatchWhite,
  CopyWhite,
  UpWhite,
  DownWhite,
  LeftWhite,
  DeleteWhite,
  CancelWhite,
  CloseWhite,
  SubmitWhite,
  UploadWhite,
  PictureWhite,
  PermissionsWhite,
  SetWhite,
  CodeWhite,
  TransferWhite,
  ShelvesWhite,
  TheShelvesWhite,
  RecommendedWhite,
  CouponsWhite,
  RecycleWhite,
  PrintWhite,
  SearchWhite,
  GoodsWhite,
  QRCodeBlue,
  RecycleBlue,
  GenerateBlue,
  SettlementBlue,
  CommentBlue,
  IphoneBlue,
  MailBlue,
  WorkflowHangYellow,
  RefreshRed,
  InvalidRed,
  UserCyan,
  AuditCyan,
  RefreshWhite,
  RefreshBlack,
  DefaultUserCyan,
  StoreHouseBlue,
  ReloadBlue,
  MinusSquare,
  CancelBlue,
  SwapBlack,
  MenuWhite,
  FullscreenWhite,
  FullscreenexitWhite,
  StaroutlinedBlack,
  StarFilledYellow,
  UserBlack,
  LogoutBlack,
  BellWhite,
  UploadBlack,
  AppstoreBlack,
  RightBlack,
  AddBlack,
  MenuBlack,
  CloseBlack,
  WrongBlack,
  ClosecircleBlack,
  CheckcircleBlack,
  QuestioncircleBlack,
  DoubleleftBlack,
  DoublerightBlack,
  FormBlack,
  EyeBlack,
  DashboardBlack,
  LoadingBlack,
  HeartBlack,
  SendBlack,
  ShareBlack,
  MessageBlack,
  LockBlack,
  DistrbutionLinedWhite,
  DistrbutionLinedBlue,
  InvoicingLinedWhite,
  InvoicingLinedBlue,
  TransferBlue,
  InfoCircleLinedBlue
};
