import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'


//IMPORT HTML FILES
import './main.html';
import './mainindex/first.html'
import './mainindex/home.html'
import './mainindex/taskDesign.html'
import '../collections/task-collection.js'
import './mainindex/consent.html'
import './mainindex/error.html'
import './mainindex/refresh.html'
import './mainindex/accept.html'
import './mainindex/inst_profile.html'
import './mainindex/instr-2.html'
import './mainindex/instr-3.html'
import './mainindex/qualification.html'
import './mainindex/survey.html'
import './mainindex/trns_qual.html'
import './mainindex/Improvement.html'
import './mainindex/survey1.html'

//IMPORT JAVA SCRIPT FILES
import "./Scripts/register.js"
import "./Scripts/router.js"
import "./Scripts/home.js"
import "./Scripts/task.js"
import "./Scripts/index_manager.js"
import "./Scripts/inst_profile.js"
import "./Scripts/intro.min.js"
import "./Scripts/instr-2.js"
import "./Scripts/instr-3.js"
import "./Scripts/qualification.js"
import "./Scripts/survey.js"
import "./Scripts/consent.js"
import "./Scripts/Improvement.js"
import "./Scripts/survey1.js"
import { load } from '@fingerprintjs/botd'
import * as FingerprintJS_old from '@fingerprintjs/fingerprintjs';
//import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

//also set in the server code in seconds.
how_long_time_in_the_last_scene = 1800;
//qualification setting for cp.
hw_mn_qz_cpt_atm_all = 10;
//bo
fixed_bonus = 3.3;
//conversion rate
conversion_rate = 1.5;
//conversion coin
conversion_coin = 500;

introJs = require('intro.js');

//require('events').EventEmitter.defaultMaxListeners = Infinity;  //For maximum listeners error hadling (MaxListenersExceededWarning)

//require('events').EventEmitter.defaultMaxListeners = 15;
//m
//Subscribe to Server Contents
Meteor.subscribe('allowedData');
Meteor.subscribe('allowedFairness');
Meteor.subscribe('allowedCaptcha');

//SETTINGS
var num_of_demographics = 4;
path_new = "";//"/mag"; //NOTE: either "" or /mag
num_of_tutorials = 1;
box_threshold = 0.3;
// num_of_tutorials -= 1;
color_first_race = '#0000ff';
color_second_race = '#ff00ff';

IMPROVEMENT = 0;

//A Red
FIRST_RACE = "Male";

//B Blue
SECOND_RACE = "Female";

//If improvement is changing the credit score
IMPROVEMENT_CREDIBILITY = -1

threshold = 650;        //Credit Score Threshold to be accepted
initial_budget = 600;  //Initial Person Budget
total_num_rounds = 10; //total num of rounds for the task
cost = 50;    //Loan application cost
gain = 100;  //The reward you get from loan approval
improvement_cost = 5; //How much it costs to improve yourself
sim_n_low = 12000; //for confusion matrix how many people to simulate low threshold
sim_n_high = 12200; //for confusion matrix how many people to simulate high threshold

DEBUG = 0;
allow_last_to_be_down = false;

//Matrices for the each credit score ranges
//Fair decision matrix approval probability
fair_cred_scr_probs = [ 0.15,0.22, 0.29, 0.36, 0.43, 0.50, 0.57, 0.64, 0.71, 0.78, 0.85]

//Unfair decision matrix red approval probability
unfair_red_cred_scr_probs = [ 0.25 ,0.32, 0.39, 0.46, 0.53, 0.60, 0.67, 0.74, 0.81, 0.88, 0.95]

//Unfair decision matrix blue approval probability
unfair_blue_cred_scr_probs = [0.05,0.12, 0.19, 0.26, 0.33, 0.40, 0.47, 0.54, 0.61, 0.68, 0.75]

//Improvement opportunities probabilities
improvement_probabilities = [[0.44],  [0.80, 0.72, 0.64, 0.56, 0.48, 0.40, 0.32, 0.24, 0.16, 0.08],  [0.08, 0.16, 0.24, 0.32, 0.40, 0.48, 0.56, 0.64, 0.72, 0.80]]

// INDEX_OF_660_to_690 = 4;


//For subjects
credit_ranges = ["[300 - 350]","[350 - 400]", "[400 - 450]", "[450 - 500]", "[500 - 550]", "[550 - 600]", "[600 - 650]", "[650 - 700]", "[700 - 750]", "[750 - 800]", "[800 - 850]"];

assignable_credit_last_index = credit_ranges.length - 2; //index not included
assignable_credit_start_index_in_flw = 0;

//For flowchart
credit_ranges_flw = ["[300 - 350]","[350 - 400]", "[400 - 450]", "[450 - 500]", "[500 - 550]", "[550 - 600]", "[600 - 650]", "[650 - 700]", "[700 - 750]", "[750 - 800]", "[800 - 850]"];

fair_cred_scr_probs_flw = [0.15,0.22, 0.29, 0.36, 0.43, 0.50, 0.57, 0.64, 0.71, 0.78, 0.85]

//Unfair decision matrix red approval probability
unfair_red_cred_scr_probs_flw = [0.25 ,0.32, 0.39, 0.46, 0.53, 0.60, 0.67, 0.74, 0.81, 0.88, 0.95]

//Unfair decision matrix blue approval probability
unfair_blue_cred_scr_probs_flw = [0.05,0.12, 0.19, 0.26, 0.33, 0.40, 0.47, 0.54, 0.61, 0.68, 0.75]


//console.log("\~850");
career = ["Software and IT services", "Advertising and marketing", "Food and accommodation service", "Healthcare service", "Construction"];

/*pictures = ["https://bootdey.com/img/Content/avatar/avatar1.png","https://bootdey.com/img/Content/avatar/avatar2.png","https://bootdey.com/img/Content/avatar/avatar3.png","https://bootdey.com/img/Content/avatar/avatar4.png","https://bootdey.com/img/Content/avatar/avatar5.png","https://bootdey.com/img/Content/avatar/avatar6.png"
,"https://bootdey.com/img/Content/avatar/avatar7.png", "https://bootdey.com/img/Content/avatar/avatar8.png", "https://pickaface.net/gallery/avatar/unr_hylarie_210513_0032_rzczgu8.png", "https://pickaface.net/gallery/avatar/20140625_092852_3166_gabriele47.png","https://pickaface.net/gallery/avatar/shere.153d2f4a11fb68.png","https://pickaface.net/gallery/avatar/20141030_220221_600_Safiyah.png",
"https://pickaface.net/gallery/avatar/frecklefoot563cc4a8def8d.png","https://pickaface.net/gallery/avatar/room18arrow5410fe0443cb9.png","https://pickaface.net/gallery/avatar/20130522_120536_2600_jonny.png","https://pickaface.net/gallery/avatar/20130804_223749_1089_mtb.png","https://pickaface.net/gallery/avatar/unr_jahailey_200309_2012_9d7xif.png", "https://pickaface.net/gallery/avatar/unr_dimitra_180613_1709_8lwxix.png",
"https://pickaface.net/gallery/avatar/unr_omaarinaadriana_210121_1842_2re0f5k.png","https://pickaface.net/gallery/avatar/unr_jack_210121_1136_7o1v2kh7.png", "https://pickaface.net/gallery/avatar/GoTell33526dad11d55ca.png", "https://pickaface.net/gallery/avatar/47519597_180313_0202_17la.png", "https://pickaface.net/gallery/avatar/20141019_144553_2851_ss-male.png", "https://pickaface.net/gallery/avatar/20160302_025816_4058_neth.png",
"https://pickaface.net/gallery/avatar/37772239_170707_1516_rcqr1k2.png","https://pickaface.net/gallery/avatar/icastillo5547015bd2e58.png", "https://pickaface.net/gallery/avatar/20110421_074904_1852_qq.png", "https://pickaface.net/gallery/avatar/kartikey.dhar.3542bb1de324fc.png", "https://pickaface.net/gallery/avatar/hottest_wog5418ebbec56fb.png", "https://pickaface.net/gallery/avatar/ktakande554d2d4da9d27.png",
"https://pickaface.net/gallery/avatar/unr_milan_200923_1601_xdiq1.png", "https://pickaface.net/gallery/avatar/20160621_221517_1034_toon.png", "https://pickaface.net/gallery/avatar/nabby78654f59dd198601.png", "https://pickaface.net/gallery/avatar/IndraSetyaPramana52800bf477b16.png", "https://pickaface.net/gallery/avatar/unr_rein2_210519_1443_9zow4t.png", "https://pickaface.net/gallery/avatar/unr_dracomalfoy_210122_1618_zs4ea.png",
"https://pickaface.net/gallery/avatar/20140219_223701_1720_Abiola.png", "https://pickaface.net/gallery/avatar/BeNJa51e3eef725355.png", "https://pickaface.net/gallery/avatar/unr_kodat_161220_0113_7h4g475b.png", "https://pickaface.net/gallery/avatar/26979437_170405_0041_9n421i.png", "https://pickaface.net/gallery/avatar/LittleIsramon5387e14ce105e.png", "https://pickaface.net/gallery/avatar/itstudent5526d63ef25b9.png",
"https://pickaface.net/gallery/avatar/unr_thshy_210112_0000_9nud7t.png", "https://pickaface.net/gallery/avatar/unr_tonton_210111_1756_b9sh.png", "https://pickaface.net/gallery/avatar/MichaelGuzman152198c8667909.png", "https://pickaface.net/gallery/avatar/unr_miles_200116_2215_2e48h7b.png", "https://pickaface.net/gallery/avatar/20130517_175736_911_Jackattack.png", "https://pickaface.net/gallery/avatar/41475568_170621_2358_9tyeqa.png",
"https://pickaface.net/gallery/avatar/unr_semtuenter_210112_1854_yjvod.png", "https://pickaface.net/gallery/avatar/unr_bern_210112_0004_9oj13r.png", "https://pickaface.net/gallery/avatar/20140302_104610_2385_fatima.png", "https://pickaface.net/gallery/avatar/87222326_170814_0653_riqwwrj.png", "https://pickaface.net/gallery/avatar/20141027_214809_819_WeddingMan.png", "https://pickaface.net/gallery/avatar/20150106_223646_1818_kaleah.png",
"https://pickaface.net/gallery/avatar/unr_standingman_210122_1529_9xp8tj.png", "https://pickaface.net/gallery/avatar/unr_standingman_210122_1522_9xq4my.png", "https://pickaface.net/gallery/avatar/anis.belkacem53be084cb2901.png", "https://pickaface.net/gallery/avatar/20130507_122917_3468_liza.png", "https://pickaface.net/gallery/avatar/20120916_183959_1225_filho-adulto.png",
"https://pickaface.net/gallery/avatar/20130112_133053_4934_will.png", "https://pickaface.net/gallery/avatar/unr_mrwallis_180214_1934_cisc.png", "https://pickaface.net/gallery/avatar/20130527_165404_4557_rami.png", "https://pickaface.net/gallery/avatar/20121101_094418_816_Yourworstnight.png", "https://pickaface.net/gallery/avatar/20130807_095551_3053_Finnigan.png", "https://pickaface.net/gallery/avatar/20120409_140021_2154_kaio.png",
"https://pickaface.net/gallery/avatar/20140108_073402_2656_K.png", "https://pickaface.net/gallery/avatar/unr_zoefetters_160921_0022_2mjs5v8.png", "https://pickaface.net/gallery/avatar/26195439_181227_1819_2er034a.png", "https://pickaface.net/gallery/avatar/20130912_212150_4709_minny.png", "https://pickaface.net/gallery/avatar/unr_rdmlj_210108_0609_2nu6mj8.png", "https://pickaface.net/gallery/avatar/unr_willow_210104_1713_b7h2.png",
"https://pickaface.net/gallery/avatar/unr_markanderson_201228_0937_ze5fq.png","https://pickaface.net/gallery/avatar/unr_marrokaanman_201208_1908_c09t.png","https://pickaface.net/gallery/avatar/unr_hasan_201208_1909_17uj.png","https://pickaface.net/gallery/avatar/unr_mijjjjjjjjjjj_201207_0745_9gs8qn.png","https://pickaface.net/gallery/avatar/unr_saravolt_201206_0741_35bwt.png","https://pickaface.net/gallery/avatar/unr_stasia_201204_0158_3j7s1.png",
"https://pickaface.net/gallery/avatar/unr_pink_201202_2352_ybmil.png","https://pickaface.net/gallery/avatar/unr_marciotorris_201128_0250_2dbdpv9.png","https://pickaface.net/gallery/avatar/unr_nawal_201127_0610_tzbfw.png","https://pickaface.net/gallery/avatar/unr_lingtiyoon_201120_0836_y1mqa.png","https://pickaface.net/gallery/avatar/unr_samiya_201114_0042_bymd.png","https://pickaface.net/gallery/avatar/unr_joaquin_201112_1712_12pe.png",
"https://pickaface.net/gallery/avatar/unr_brigitte_201105_2158_380wz.png","https://pickaface.net/gallery/avatar/unr_jeoma_201105_1716_vm6cd.png","https://pickaface.net/gallery/avatar/unr_luiz_201104_2147_33k7v.png","https://pickaface.net/gallery/avatar/unr_susanne_201102_0524_zca8z.png","https://pickaface.net/gallery/avatar/unr_granny_201029_0557_9x2rbv.png","https://pickaface.net/gallery/avatar/unr_pn34_201029_1848_co1t.png",
"https://pickaface.net/gallery/avatar/unr_jfred_201019_2014_9qr87h.png","https://pickaface.net/gallery/avatar/unr_antonio_201018_1613_2o1hpfs.png", "https://pickaface.net/gallery/avatar/unr_chaunceymoody_201016_2106_z4cdv.png","https://pickaface.net/gallery/avatar/unr_boyy_201016_1917_9r6jhf.png",
"https://pickaface.net/gallery/avatar/unr_fielisbertosilva_201016_1849_9r76kh.png","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhxvpPCVQ81bJSPfx9COfHcMsj5-HmvexKdg&usqp=CAU","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1kwIpDYi9Og5ejn6qNIcNlFev91KTTyEB0A&usqp=CAU", "https://pickaface.net/gallery/avatar/rosenrot_51e4f938d46b4.png","https://pickaface.net/gallery/avatar/linda1415573a1e9d757c2.png","https://pickaface.net/gallery/avatar/tcope1235643811933c13.png","https://pickaface.net/gallery/avatar/lucywild215799dbd11cec2.png","https://pickaface.net/gallery/avatar/doornroosje5788882abf74a.png","https://pickaface.net/gallery/avatar/NelinaPastle537aa6b88887f.png","https://pickaface.net/gallery/avatar/NelinaPastle537aa6b88887f.png","https://pickaface.net/gallery/avatar/MsMattheis54c671655251e.png","https://pickaface.net/gallery/avatar/Triple_M52894fb9928be.png","https://pickaface.net/gallery/avatar/dbroschat56b37a9488f80.png","https://pickaface.net/gallery/avatar/lkoppenhafer51dde70770f14.png","https://pickaface.net/gallery/avatar/felicitas.heerwig53eb3a1d58f12.png","https://pickaface.net/gallery/avatar/LouiseSpence570d6aaca5f85.png","https://pickaface.net/gallery/avatar/LouiseSpence570d6aaca5f85.png","https://pickaface.net/gallery/avatar/Helo5479a1b223dfa.png"];
*/

pictures = ["images/199700001-10212369-0.png", "images/199700002-10212369-0.png", "images/199700003-10212369-0.png", "images/199700004-10212369-0.png", "images/199700005-10212369-0.png", "images/199700007-10212369-0.png", "images/199700008-10212369-0.png", "images/199700009-10212369-0.png", "images/199700012-10212369-0.png", "images/199700016-10212369-0.png", "images/199700017-10212369-0.png", "images/199700018-10212369-0.png", "images/199700019-10212369-0.png", "images/199700022-10212369-0.png", "images/199700025-10212369-0.png", "images/199700027-10212369-0.png", "images/199700028-10212369-0.png", "images/199700031-10212369-0.png", "images/199700032-10212369-0.png", "images/199700035-10212369-0.png", "images/199700036-10212369-0.png", "images/199700038-10212369-0.png", "images/199700042-10212369-0.png", "images/199700044-10212369-0.png", "images/199700046-10212369-0.png", "images/199700047-10212369-0.png", "images/199700048-10212369-0.png", "images/199700052-10212369-0.png", "images/199700053-10212369-0.png", "images/199700054-10212369-0.png", "images/199700055-10212369-0.png", "images/199700056-10212369-0.png", "images/199700058-10212369-0.png", "images/199700061-10212369-0.png", "images/199700062-10212369-0.png", "images/199700063-10212369-0.png", "images/199700064-10212369-0.png", "images/199700066-10212369-0.png", "images/199700067-10212369-0.png", "images/199700068-10212369-0.png", "images/199700069-10212369-0.png", "images/199700070-10212369-0.png", "images/199700071-10212369-0.png", "images/199700072-10212369-0.png", "images/199700073-10212369-0.png", "images/199700075-10212369-0.png", "images/199700076-10212369-0.png", "images/199700079-10212369-0.png", "images/199700082-10212369-0.png", "images/199700084-10212369-0.png", "images/199700086-10212369-0.png", "images/199700088-10212369-0.png", "images/199700093-10212369-0.png", "images/199700096-10212369-0.png", "images/199700101-10212369-0.png", "images/199700102-10212369-0.png", "images/199700103-10212369-0.png", "images/199700104-10212369-0.png", "images/199700106-10212369-0.png", "images/199700110-10212369-0.png", "images/199700114-10212369-0.png", "images/199700116-10212369-0.png", "images/199700118-10212369-0.png", "images/199700120-10212369-0.png", "images/199700121-10212369-0.png", "images/199700122-10212369-0.png", "images/199700123-10212369-0.png", "images/199700124-10212369-0.png", "images/199700126-10212369-0.png", "images/199700128-10212369-0.png", "images/199700132-10212369-0.png", "images/199700133-10212369-0.png", "images/199700135-10212369-0.png", "images/199700136-10212369-0.png", "images/199700137-10212369-0.png", "images/199700138-10212369-0.png", "images/199700139-10212369-0.png", "images/199700140-10212369-0.png", "images/199700142-10212369-0.png", "images/199700143-10212369-0.png", "images/199700145-10212369-0.png", "images/199700146-10212369-0.png", "images/199700148-10212369-0.png", "images/199700149-10212369-0.png", "images/199700150-10212369-0.png", "images/199700151-10212369-0.png", "images/199700152-10212369-0.png", "images/199700154-10212369-0.png", "images/199700156-10212369-0.png", "images/199700157-10212369-0.png", "images/199700158-10212369-0.png", "images/199700159-10212369-0.png", "images/199700162-10212369-0.png", "images/199700163-10212369-0.png", "images/199700166-10212369-0.png", "images/199700167-10212369-0.png", "images/199700168-10212369-0.png", "images/199700169-10212369-0.png", "images/199700170-10212369-0.png", "images/199700171-10212369-0.png", "images/199700172-10212369-0.png", "images/199700173-10212369-0.png", "images/199700176-10212369-0.png", "images/199700179-10212369-0.png", "images/199700180-10212369-0.png", "images/199700181-10212369-0.png", "images/199700183-10212369-0.png", "images/199700184-10212369-0.png", "images/199700188-10212369-0.png", "images/199700190-10212369-0.png", "images/199700191-10212369-0.png", "images/199700195-10212369-0.png", "images/199700196-10212369-0.png", "images/199700197-10212369-0.png", "images/199700199-10212369-0.png", "images/199700200-10212369-0.png", "images/199700201-10212369-0.png", "images/199700203-10212369-0.png", "images/199700206-10212369-0.png", "images/199700207-10212369-0.png", "images/199700208-10212369-0.png", "images/199700210-10212369-0.png", "images/199700211-10212369-0.png", "images/199700212-10212369-0.png", "images/199700213-10212369-0.png", "images/199700214-10212369-0.png", "images/199700215-10212369-0.png", "images/199700222-10212369-0.png", "images/199700224-10212369-0.png", "images/199700225-10212369-0.png", "images/199700226-10212369-0.png", "images/199700229-10212369-0.png", "images/199700230-10212369-0.png", "images/199700231-10212369-0.png", "images/199700232-10212369-0.png", "images/199700235-10212369-0.png", "images/199700236-10212369-0.png", "images/199700237-10212369-0.png", "images/199700238-10212369-0.png", "images/199700240-10212369-0.png", "images/199700241-10212369-0.png", "images/199700242-10212369-0.png", "images/199700247-10212369-0.png", "images/199700248-10212369-0.png", "images/199700249-10212369-0.png", "images/199700250-10212369-0.png", "images/199700251-10212369-0.png", "images/199700252-10212369-0.png", "images/199700253-10212369-0.png", "images/199700254-10212369-0.png", "images/199700255-10212369-0.png", "images/199700256-10212369-0.png", "images/199700260-10212369-0.png", "images/199700262-10212369-0.png", "images/199700263-10212369-0.png", "images/199700268-10212369-0.png", "images/199700273-10212369-0.png", "images/199700274-10212369-0.png", "images/199700275-10212369-0.png", "images/199700278-10212369-0.png", "images/199700279-10212369-0.png", "images/199700280-10212369-0.png"]

is_in_the_imp = false;
has_seen_cpy = false;
just_here_cpy = false;
atte = 0;
t_z = "not found";
amtLink = "";

//REGISTRATION VARIABLES
worker_Id = "";
assignment_Id = "";
turkSubmitTo = "";
hit_Id = "";
pathh = window.location.href;
worker_Id = ((worker_Id == "") ? gup(pathh, 'workerId') : worker_Id);
worker_Id_save = sessionStorage.getItem("workerId");
if (worker_Id_save == undefined || worker_Id_save == "" || (worker_Id_save != worker_Id && worker_Id != ""))
{
  window.sessionStorage.setItem("workerId", worker_Id);
  worker_Id_save = worker_Id;
}
worker_Id = worker_Id_save

assignment_Id = ((assignment_Id == "") ? gup(pathh, 'assignmentId') : assignment_Id);
assignment_Id_save = sessionStorage.getItem("assignmentId");
if (assignment_Id_save == undefined || assignment_Id_save == "" || (assignment_Id_save != assignment_Id && assignment_Id != ""))
{
  window.sessionStorage.setItem("assignmentId", assignment_Id);
  assignment_Id_save = assignment_Id;
}
assignment_Id = assignment_Id_save;


turkSubmitTo = ((turkSubmitTo == "") ? gup(pathh, 'turkSubmitTo') : turkSubmitTo);
turkSubmitTo_save = sessionStorage.getItem("turkSubmitTo");
if (turkSubmitTo_save == undefined || turkSubmitTo_save == "" || (turkSubmitTo_save != turkSubmitTo && turkSubmitTo != ""))
{
  window.sessionStorage.setItem("turkSubmitTo", turkSubmitTo);
  turkSubmitTo_save = turkSubmitTo;
}
turkSubmitTo = turkSubmitTo_save;

hit_Id = ((hit_Id == "") ? gup(pathh, 'hitId') : hit_Id);
hit_Id_save = sessionStorage.getItem("hitId");
if (hit_Id_save == undefined || hit_Id_save == "" || (hit_Id_save != hit_Id && hit_Id != ""))
{
  window.sessionStorage.setItem("hitId", hit_Id);
  hit_Id_save = hit_Id;
}
hit_Id = hit_Id_save;


// console.log(worker_Id);
// console.log(assignment_Id);
// console.log(turkSubmitTo);
// console.log(hit_Id);

const botdPromise = load()

let interval;
let consistentCount = 0;
let totalRun = 0;

async function getFingerprintAndSave() {

  totalRun++;
  if (totalRun > 30) {
      clearInterval(interval);
      return;
  }

  if (window.location.href.includes("/error")) {
    clearInterval(interval);
  } else {
        try {
            const fpInstance = await FingerprintJS_old.load();
            const result = await fpInstance.get();
            const visitorId = result.visitorId;
            const user = UserAdv.findOne({ "_id": Meteor.userId() });

            if (user.amtId === "ASSIGNMENT_ID_NOT_AVAILABLE") {
                clearInterval(interval);
                return;
            }

            if (user.blocked == 1 && user.currentIndex < 2)
            {
              clearInterval(interval);
              window.location.href = path_new + "/error2";
            }

            if (user.authenticationId === visitorId) {
                consistentCount++;

                if (consistentCount >= 10) {
                    clearInterval(interval);
                    return;
                }
            } else {
                consistentCount = 0;

                if (user.authenticationId !== -1) {
                    UserAdv.update(Meteor.userId(), { $set: { authenticationId: visitorId, fing_old: user.authenticationId } });
                } else {
                    UserAdv.update(Meteor.userId(), { $set: { authenticationId: visitorId, fing_old: visitorId } });
                }

                if (user.currentIndex < 2) {
                    Meteor.call('check_finger', function (error, result) {
                        if (error) {
                        } else {
                            if (result == true) {
                                clearInterval(interval);
                                window.location.href = path_new + "/error2";
                            }
                        }
                    });
                }
            }
        } catch (error) {
        }
    }
}

getFingerprintAndSave();

interval = setInterval(getFingerprintAndSave, 500);



auto_refresh_ip = setInterval(
    function()
  {
    var index = UserAdv.findOne({"_id" : Meteor.userId()});
    if (window.location.href.includes("/error") || window.location.href.includes("/error1") || window.location.href.includes("/error2"))
    {
        clearInterval(auto_refresh_ip);
    }else{
    if (index != undefined)
      {
          if (index.amtId === "ASSIGNMENT_ID_NOT_AVAILABLE")
          {
            clearInterval(auto_refresh_ip);
          }else{
            Meteor.call('check_worker1', function (error, result) {

                if (error)
                {
                  error_handle();
                }
                  else {
                    if (result == true)
                    {
                        clearInterval(auto_refresh_ip);
                         window.location.href = path_new + "/error2";
                    }else
                    {
                        clearInterval(auto_refresh_ip);
                    }

                  }
                }
              );
              botdPromise
    .then((botd) => botd.detect())
    .then((result) =>
    UserAdv.update(Meteor.userId(), { $set: {tecna : result['bot']}}, function( error, result) {
      if ( error ) {}
      if ( result ) {}
    })).catch((error) => console.log('hollow'))

    // fpPromise_old
    // .then(fp => fp.get())
    // .then(result => {

    //   const visitorId = result.visitorId
    //   UserAdv.update(Meteor.userId(), { $set: {authenticationId : visitorId}}, function( error, result) {
    //     if ( error ) {}
    //     if ( result ) {}
    //   });
    //   UserAdv.update(Meteor.userId(), { $set: {fing_old : visitorId}}, function( error, result) {
    //     if ( error ) {}
    //     if ( result ) {}
    //   })
    // });

    if (assignment_Id != undefined && assignment_Id != "" && assignment_Id != "ASSIGNMENT_ID_NOT_AVAILABLE")
    {

      //console.log(index.assignment_Id != assignment_Id)
      if (assignment_Id != index.assignment_Id && index.currentIndex <= 1)
      {
        UserAdv.update(Meteor.userId(), { $set: {assignment_Id : assignment_Id}}, function( error, result) {
          if ( error ) {}
          if ( result ) {}
        })
      }else if (assignment_Id != index.assignment_Id && index.currentIndex > 1)
      {
        if (index.assignment_Id != undefined && index.assignment_Id != "")
        {
          window.location.href = path_new + "/error5";
        }
      }else
      {

      }
    }


    try
    {
      t_z = Intl.DateTimeFormat().resolvedOptions().timeZone;
      UserAdv.update(Meteor.userId(), { $set: {t_z : t_z}}, function( error, result) {
        if ( error ) {}
        if ( result ) {}
      })

    }
    catch(err)
    {
      console.log("t_z_f");
    }

    try
    {

  if (index.authenticationId == -1 && index.currentIndex > 1)
  {
  //   const fpPromise = FingerprintJS.load({
  //     apiKey: "arAbhOA4ecZuwViwZK24"
  //   });
  // fpPromise
  //   .then(fp => fp.get())
  //   .then(result => {
  //     const visitorId = result.visitorId
  //     UserAdv.update(Meteor.userId(), { $set: {authenticationId : visitorId}}, function( error, result) {
  //       if ( error ) {}
  //       if ( result ) {}
  //     })
  //   });
  }
    }catch(err) {
      console.log("private_fin_get_failed");
    }


          }
      } }

  }, 2000);

  //error_counter = 0;
  error_in_tsk_or_tut = 0;
  error_in_userAdv = 0;
  upper_limit_userAdv = 3;
  auto_refresh_error = setInterval(
    function()
  {
    var index = UserAdv.findOne({"_id" : Meteor.userId()});
    var path = window.location.href;
    worker_Id = ((worker_Id == "") ? gup(path, 'workerId') : worker_Id);
    assignment_Id = ((assignment_Id == "") ? gup(path, 'assignmentId') : assignment_Id);
    turkSubmitTo = ((turkSubmitTo == "") ? gup(path, 'turkSubmitTo') : turkSubmitTo);
    hit_Id = ((hit_Id == "") ? gup(path, 'hitId') : hit_Id);
    if (window.location.href.includes("/error") || window.location.href.includes("/error1") || window.location.href.includes("/error2"))
    {
        clearInterval(auto_refresh_error);
    }
    else{
    if (index != undefined)
    {
      error_in_userAdv = 0;
      if (index.currentIndex == 9)
      {
        var date = new Date();
        var time = date.getTime();
        var difference = Math.round((time - index.index9time) / 1000);
        if (difference > how_long_time_in_the_last_scene)
        {
          UserAdv.update(Meteor.userId(), { $set: {sp : 1}}, function( error, result) {
            if ( error ) {error_handle();} //info about what went wrong
            if ( result ) {
              window.location.href = path_new + "/error2";
          } //the _id of new object if successful
          });
        }
      }

      if (index.currentIndex >= 1 && (index.ip_address == 0 || index.ip_address == undefined))
      {
          UserAdv.update(Meteor.userId(), { $set: {sp : 1}}, function( error, result) {
            if ( error ) {error_handle();} //info about what went wrong
            if ( result ) { window.location.href = path_new + "/error2"; } //the _id of new object if successful
});
      }
      if (index.sp == 1 || index.atmp >= hw_mn_qz_cpt_atm_all)
      {
        window.location.href = path_new + "/error2";
      }
       if (index.captcha == false && index.currentIndex > 5)
       {
        UserAdv.update(Meteor.userId(), { $set: {sp : 1}}, function( error, result) {
          if ( error ) {error_handle();} //info about what went wrong
          if ( result ) { window.location.href = path_new + "/error2"; } //the _id of new object if successful
});
       }
    }
    else
    {
      error_in_userAdv += 1;
    }

    if (document.getElementById('budget_up') != undefined)
    {
        if (document.getElementById('budget_up').innerHTML === "")
        {
            error_in_tsk_or_tut++;
        }else
        {
            error_in_tsk_or_tut = 0;
        }
    }

    if (error_in_userAdv == upper_limit_userAdv)
    {

        if (upper_limit_userAdv == 3)
        {
          regAccount();
          upper_limit_userAdv = 6;
        }else
        {
          error_in_userAdv = 0;
          location.reload();
        }
        //console.log("here");
        // window.location.href = path_new + "/error3";

        //userAdvAttempt();
    }

    //if (error_counter == 5 || error_in_tsk_or_tut == 3)
    if (error_in_tsk_or_tut == 3)
    {
        error_handle();
    }


  }

  }, 1000);


const channel = new BroadcastChannel('app-data');
channel.addEventListener ('message', (event) => {

if (event.data != Meteor.userId())
{
    //alert("Logged in on another tab, refresh page to login here again!");
    //BlazeLayout.render('error1');
    window.location.href = path_new + "/error1";

}
 //console.log("EVENT: " + event.data);
 //console.log("my Meteor: " + Meteor.userId());
});

tabId = sessionStorage.getItem("tabId");
if (tabId == undefined || tabId == "" )
{
  tabId = makeWork(15);
  window.sessionStorage.setItem("tabId", tabId);
}

startTime = sessionStorage.getItem("startTime");
if (startTime == undefined || startTime == "" )
{
  var date = new Date();
  var startTime = date.getTime();
  window.sessionStorage.setItem("startTime", startTime);
}

var our_data = {
  start: startTime,
  name: tabId,
  ImNew: "Yes",
  assingmentId: assignment_Id,
  myId : Meteor.userId()
};

const post = new BroadcastChannel('new-tab');
post.postMessage(our_data);

const listen = new BroadcastChannel('new-tab');
listen.addEventListener ('message', (event) => {

if (window.location.href.includes("/error") || assignment_Id == "ASSIGNMENT_ID_NOT_AVAILABLE" || event.data.assingmentId == "ASSIGNMENT_ID_NOT_AVAILABLE")
{
    return;
}
if (event.data.assingmentId === assignment_Id || Meteor.userId() !== event.data.myId) //&& assignment_Id != undefined && assignment_Id != "")
{
    //alert("Logged in on another tab, refresh page to login here again!");
    //BlazeLayout.render('error1');
    return;

}else if (event.data.ImNew === "Yes" && event.data.tabId !== tabId && event.data.assingmentId !== assignment_Id)
{
  var my_response = {
    start: startTime,
    name: tabId,
    ImNew: "No",
    assingmentId: assignment_Id,
    myId: Meteor.userId()
  };
  post.postMessage(my_response);
}
else if (event.data.ImNew === "No" && event.data.tabId !== tabId && event.data.assingmentId !== assignment_Id)
{
  window.location.href = path_new + "/error6";
}
else
{
  return;
}
 //console.log("EVENT: " + event.data);
 //console.log("my Meteor: " + Meteor.userId());
});


try
{
  amtLink = window.location.href;
  if (amtLink.includes("workerId") && assignment_Id !== "ASSIGNMENT_ID_NOT_AVAILABLE" )
  {
    window.sessionStorage.setItem("amtLink", amtLink);
  }
  amtLink = sessionStorage.getItem("amtLink");
}catch(err)
{
  console.log("path extraction issue for later.");
}

amtLinkRefresh = function()
{
  if (amtLink != null && amtLink != "" && amtLink != undefined && amtLink.includes("workerId"))
  {
    window.location.href = amtLink;
  }else
  {
    location.reload();
  }
}


butonRef= function(x)
{
if (document.getElementById(x).style.backgroundColor == "rgb(204, 204, 204)")
{
    return true;
}

document.getElementById(x).disabled = true;
document.getElementById(x).style.border = "1px solid #999999";
document.getElementById(x).style.backgroundColor = "#cccccc";
document.getElementById(x).style.color = "#666666";
setTimeout(() => {
  amtLinkRefresh();
}, 10000)
return false;
}


comparatorForIndices = function(localIndex, isAdv)
{
  var index = UserAdv.findOne({"_id" : Meteor.userId()});
  if (index == null)
  {
    error_handle();
  }
  let difference = index.currentIndex - localIndex;
  if (isAdv)
  {
    if (difference == -1 || difference == 0)
    {
      return true;
    }
    else
    {
      amtLinkRefresh();
      return false;
    }
  }
  else
  {
    if (difference == 1 || difference == 0)
    {
      return true;
    } else
    {
      amtLinkRefresh();
      return false;
    }
  }

}
