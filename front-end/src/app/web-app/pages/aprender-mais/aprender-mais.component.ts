import { Component, OnInit } from '@angular/core';

interface LearningContent {
  type: 'Artigo' | 'Vídeo' | 'Curso' | 'Podcast';
  title: string;
  titleOverlay: string;
  imageUrl: string;
  tags: string[]; // Adicionado para permitir múltiplos filtros
}

interface MotivationContent {
  icon: string;
  text: string;
}

@Component({
  selector: 'app-aprender',
  templateUrl: './aprender-mais.component.html',
  styleUrls: ['./aprender-mais.component.css']
})
export class AprenderComponent implements OnInit {

  // --- Estado da UI  ---
  searchTerm: string = '';
  categories: string[] = ['Artigos', 'Vídeos', 'Podcasts', 'Cursos', 'Palestras', 'Ansiedade', 'Sono', 'Estudo'];
  activeFilters: Set<string> = new Set(); // Usa um Set para múltiplos filtros
  
  // --- Dados de Exemplo com Placeholders e Tags ---
  allLearningContent: LearningContent[] = [
    { type: 'Artigo', title: 'O poder do agora', titleOverlay: 'Vamps', imageUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUQEhIVEhUSFRUXFxcVGRUVFhUVFRUXFxUXFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0lICYtLS0tLS0tLS0vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSstLS0tLf/AABEIAKgBLAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBAUGBwj/xAA+EAACAQIDBQYCCAUEAgMAAAABAgADEQQSIQUxQVFhBhMicYGRB6EUIzJCUrHB8GKCksLRM0Ny4bLxFkRT/8QAGwEAAgMBAQEAAAAAAAAAAAAAAAIBAwQFBgf/xAAoEQACAgEEAQMFAAMAAAAAAAAAAQIDEQQSITEFE0FRIjJhcZEj4fD/2gAMAwEAAhEDEQA/AOroiaOGSUcOJq4ZZaY0W6Ky3TEgoiWkErZch6iSLGLJFkEjlkkYoj5BYhDAQiwAIQhAAhCEACEIQAIQhAAhCEACEIQAIQhAAhCEACJFiGACGEDCABEiwgA2oLgjmDOFDTvBOCItpGRXMerSZDKwMkV45WaGDqWYToEOk5Wk9iJ0tB7qIshkzmMMs1KAmdh5qYcRmVxLdISwkgpSdZWWokEkEYskEgZDljo0R0BwhCEACEIQAIQhAAhCEACEIQAIQhAAhCEACEIQAIQhAAiGEIAESLEgAkWJCACzg8SLOw5Mw9iZ3c4rbK2r1B/Ff+oA/rJRXMp3kitIC0VWlhWWladDgKt0BnMZ5qbPxYCW6mQyUyPDCadCZ+GE0aMGLEt05MshSTiIWIkWSCMWSCA6FEUQEWQMghCEACEIQAIQhAAhCEACEIQAIQhAAhCEACEIQAIQkdeqEVnO5FLHyUXP5QA5Dtj23XCk0aID1R9pm+yhIva33m1Gm4fKea4vtdjXbM2JqDXQKxQD+VbCTYrAtiWaozWZ2ZjpfUkknfzMfR7FVSPAym1r57roeVr8pCsjnDKpVWy+r2NLs/8AELEU9KrGst9zkX1tazbxx33nq2zNoJXpirTNwQNOIuL2PpPCto7BrUrWKsVvotwd976753PwkxbN3iE3AXXoVYAf+RjfS1lExU4vEj0WEWJFLBbTju0y2rn+JVPyy/2zsROV7YJaojc0I/pa/wDdGQk+jn2aAaRO0aGjopJ+8i97K+aGaMRk6bDS/TlDDS/SismJcpydZXpywkUsRKseIxY8RWOLHRojpCGQQhCSAQhMfbG3kot3SjPVte25UFr3c+m4fLfIcklljRi5PCLm0tp0cOuetUWmOGY6nyA1PpG4Da+Hrf6VZH6A+L+k6zyPtDhmxVatVrOSEYLcHwjf4RwCghhbnzMxVq5dBrbQHymeV+DpaXx3rJ5eMH0JEnjuxe2GIoaCp3i/gqEsPQ3uvvOtwnxGoEDvKTqeOXKw+ZBjRvi++BbvF6ivpZX4O1hOfw3bTAv/AL2X/krD52tNN9sYYIKhr0sh0DZ1sTyGuplqmn0zFKmyPEov+F2LIsPiEqKHpsrqdxUgj3Ekk5K2sCwiSPE4hKal6jBFXezEADzJgGMksS08f7UdrquIchGNOkp8Ci6kgHRn68bcPPWU8F2txlO2XEOQODnOPZryh6mKZ1YeHvlBS4z8Htk5rt8zfRvCSLkjS/iJGULYb75jpOd2b8SmuBXpKRxancEdcpuD7zp8btnBVqC1WrKF7xSmtm71TdVy7yd2nW/WN6kZrhmS3SW0P/JE86q4yhRxBpMxVEOXMLEXBAN7G9r8Z2NHFIig94oW18xIAtpaYGERQpqArfU2te7EZbjlcG0lTBKVp03VSHDtYjQXZstwOAt85mlNZ4Lo1NRwzO2xjA7sVZXvxUhhbdrbylv4SVlp1K2e+as4ppYEglM7OSeA+z6yptHY6USXH1Y1IRSCo8uQtpb9dZ1vYvs+aRV3TJ3am1xYl3vmJ52BOv8AF0l1cvZFd8U0nL2OyiGLC00mIbOe7Yp4abcmYe4B/tnQzI7Upehf8Lqfe6/rBCz6OFqyIvJ64lJzLUZyXvImeV88M8bBB2mGmhSmdhjNGjFYyLlOTpIKUnWVlqJljxI1jxIYyHiLEEWAyCEIQAJ5j22JobQDNUJTEIu/dTYXXLfkQLj1np08p+IL5MY5qLnp1FUAE6jIi+JDfQXZtNOPPWm5raatJXKdiUezkcRi8SqDDVnVkptdMotnFiFdjxNiR775VFcjjNDGV6S0xTuKwKsUP2alJjbSppZra7re1pjCYJvk9nooJVJbcGguIDaNv58f+42oxGjaX3Ebj/iU1Ms06txY6yM/JplD4H5zFD3kbDLqN3uB5iSUrHX5jUQwUScOmW9nbRq0WDUnZGHFT8iOI6GaNTtRjC2b6RUv0YqP6Rp8pmrQjKqZd+7ny85Kcl7lMqKJPLSNLanaPE10yVarMOWgHmQoF/WZ+M2pVrW7yoz5QAAxJCgchu5D1lSvvt0jVEHKT9yyGlqWMRX8FqPpI80Sub6flK2CVguVtSpOvMb7/MyMcGnppYLKtaR42qQhcb0s3ll4xwBmjgNk98pzmyHw6fevv15SY9lOs2xqln4JsKRiFXI7IWYK4BJU6eGwOinTeOXMzoan0mmy2qZvDYd5cagW1sFzcdQvHfOSoh8E1Oo1M1KdamhItcXt4h0bjrvv0008V2hDL9ThjQuLZ3GX+lb3b8vyNz/B5uMcvC7LOMx5B8bB2X7o+yW1y6H7oNvMKeYnruxsUlWhTdHDjIov1AAIPW8+f6Y14k3uSdST1m52Q7U1sHdVsyMRmV72zL4cwI1F7a+nKNXYov8ABq1fipSrW37v+4PcYhExNgdpqOK8I+rqcUb+0/eHzm2ZsTTWUecsrlXLbJYYkp7Xo56NRf4SR5r4h+UuQgVvo8yrSjWE1NoUcjun4WYegOnytM2rLIsztFJzGFo+tK5aWCnoOFmjSlBUKnKRYjQ/vlL1ExGMi3SllZVpmWUMQtJljxI1MeIDIkEWIIsgYIQiQAhxuLSjTeq5stNSx8hy5meBba2i2IrVK773a9vwjcFHkAB6TtfiZ2izt9DpnwIb1D+JxuXyXj18p52Zg1FmXhHq/C6PZH1Zdvr9f7GNGDSSZY40GPiAJA36HQEE68t3yMzLk7s5KKGiPSMI3R6SRs5L2CrsjB1JUqQQRvBB0nrPZzEYXH0/rcPRasgGcGmhv/Gtxex+R9L+PIZubD2k9CotVDZlN+hHEHoReXV2bXz0cnyWk9aGY8SXR7FR2Phk+zh6K+VNB+QlPG9lcHV30Qp50yU+S6H1E0NnY1a1Naqbm9wRoQeoMw+2u30oUXpK/wBdUXKAN6BtCx/Dpe3WbZbVHLPKVK52bYt5yeTbVp0xWqCiSaSsQhYgkqNL6C1jvHQiUa1Swk1dwJS3m5nOZ7uqO2KQ6nzPH8oMYO1hFokEA6X8wfykYLdyTwXNl4E1XC7hvPly9Z2a4JKdPW2W24zk9i7UWgzMy5rgWAtvB3HlvPtK+1dr1a5Jc2Xgg0UcvP1gzm36a2+7DeIo2Nqbeprog7xhpfXKP8+k5qvinqNnc35AaAeQkLGEjJuo0ddXS5+SxntvjA9/UyFjHDT2k5L9vJq4XGkAam67iN87/sj2yrPUShV+sDsFDbmF9Lkj7XrPLVedT2HxyUcVTqVdVuVufulhYP6H5Ey2ubUkczyWkhKmT25aXB65tjatPDUzUqHyUfaY8gP1nLp8QqZPip5B1Jb8tflOU7bbQq/S6i1gadiRTU7u6BIRltvBsT5k8pzb4gc5ona88HF0vjK5QTny2egYzaOGxNQulYIzW8JBtcADQmx4cpUxGzqm9R3g5pr8iAflOEGImhg+0FWkDZiTayg2KqeZHHykxv8Aka3wkGvoNatvIOhG8Sm++V//AJC5/wBQtUPMsd3kbr6BQJIm3aIFmw2c8xVKX/lCED3l0dREwWeCvX28nZYLb9PE06go027zDi6UyzZqtAAAnW+Z11uPzuJVw3a9L2CObqOIIzcbdLTkdlmpSdKtNsroQVP6HoRoROmx+DSqBjKK5Uqkion/AONb7yn+E7x/i0tOHk3cP2rTjTYeol6l2mT8De6zlcNhbzUoYP8AekgZNnQ0tu3/ANtveTDbY/Aff/qZeFwJOii/lNnCbHtq59B+pijrJqUjcA2tcA25X4R8SLAuCYfbDbn0PDNUFu8bwUweLkHW3IAFvTrNueNfETbf0jElVN6dC6LbcW07xvcZf5esquntibdBpnqLlH27Zy1WoSbkkm9yTvJOpJ6yIQQ6yajTuZzGe44gh1Kleet/Dzs93FFq1QeLEKvhI+zTFyAQeLXuR5dZznw/7NCu30iqv1VM+EEaVHH5qvHmdOBE9TmzTVY+pnl/K6/1H6UOvc8B7UbJ+i4mphwCFRvBf8DAMnnYG1+YMzVnqvxW2J3lFcWg8VHwvbeaTHQ/yt7BmM8qEpthtkdjxuq9alZ7XDJAZYpv+sqgyUN+/OVnQlydHgu0NeijpRcrn9xYb1vopI0v5TAr7SuTmzXvqXvqeJud8mVvzMhxAuDprY287R85XJj9BQk5xXPvx2Ua1YbyR53iLUZrACwINmO7+m9+PGT1aKglgo3WNhvF4hQAKR938rEH8/kJHBf9b7IMPSKm5JJIIudx1FtNw3fOSVPIRzPIwZDZfXWorgSF4jaSNmi5LhTziRIRcjjsusbfUxWNlMjBsJIjeB+aWaFW2nOUUe5kqtDJHEkehYftHekoqWaygG4VtwtqGBmZX2vhLm+EoP17pF+YnNUqnDMBod99Ty9bCKDoDa3McjNPrM5y0FSkWMe+HdrpSNAc1Zn1/wCLHd0FpkVWKuyEg5WIuNxsd4PI75cP7tMfb9cqVqDUsSD15G/E75Ce5jXYohu9kXBVi97MzCVKr2C02JPADX0mzT2DjCL9wR5sin2JBkuEhI6qElk6PDOP3abWyNoLSY5vFSqDLWXmvBx/Eu/y8hMjB0HZgqKzk8F1J9BOt2Z2SqtY1SKQ5fbf1sbL7mdI+cpP2ErUDSqd3q+axQrrnU/ZIA3+U6HZux2PiqeAfh+968pc2bgFoqEUswUELmsSoO8KQBYdOgl0GKWxiTUUVRZRYfvfJLyAGOBkFqJQYt5FeKIE5OS+IfagYamcPTP11VdSP9tDpm/5HUD34a+OO00O0u0O/wAVXq5swarUyngUViqW6ZQsy2O6cy6zcz23jNLGmpfL5ZPRE6nsRsUYnEqjLemoLVN48I3C45tYeV+U5vCgcb9LbvWeyfDrDIuDR1Fmqs5Y8TlqMi+gCjTz5wohukU+X1TqqxHt8HS0KSooRFCqosFUAAAbgANwkkbCdI8hkbVpqylGAZWBBB3EEWIPS08J7XbCbBYg0jco12pMfvJyJ/Eu4+h4ie8TI7T7Bp42g1F9D9qm9rlHG49RwI4gmV2V70bNFq3p7M+z7PBQ8kDyvjaD0Kr0Koy1KTFWANxccQeIIsR0Ik6LMDTR7Sq1WRTRYFXSNNaQmJeQXJZHmpbWMJIFt3LyjWMaxkNjqI4nSMaIY0mK2WJAxjLxHihb6XtIBySCRvVykDfeaFDZ6uwW2YkgC54nQdBNnCdmU1NTKAp52F+Fjx/e+NtS7Md+rVa5OXxD7uUq7QzKoc3yl1BFtSNTry3bp6Bidm0wLU6fnu59ZRp4ZN+UL55eu+NFpGC3Xb4tJYOOpOh+yTb3tLK/vS35zfxi0gcpAYEcBfUarb1t85nVdglrMlKqt9PCHAJ/fGMoZHhr5RX2FUVSOkkpNvP6/oT/AImjs/s7iFa9SsmXgr+NvVlFvYy+mxaKtdiWvuC+ED11Jk+lJGqGshOOWmjn6h5cbW9Zs7P7MM1nr3prvAsS59APAPPXpNnDUKNLWnTF/wARJZh5Md3pJTiSenvLY145ZnuvlPiK4H4RaNIWpKo+Z/mvvMn+nPwt6E/pM+pUvvuevH3kNzwJ9wJbuwZ/ST7PUcFg6VEZaSLTHQan/kx1PrLIMhBjwZpPFIlBjgZGI8QGRIDFBjIt4Ejy1tTuGs5jtj2uw2GwtdjiAlQLUpoo1qd9lsMqGx0JBvuHOeZ/FXt5iDiK2BouaNKke7bISHqMLZyzDULfQKN4Fze4t5eyPUBYeLLvFxm1JNwp1OpN7eZhjIKXJ1WDxlOovgP8vEekmvxnCgkai4txHCa+zNruWWm5DBmAuxsRcgXLcpis0r7iep0nnIY22rH5XR3OwqFOo/1uIp4amLZnqMBpyRd7sbHToTPZOy+08Eaa4bCV1qBAbC5zG5LM2oF7kkm3OeFbNxhqL9VagFYkVSitVuRlYKxuVGn3ba8Tw0dh56FdKrYl6qhgXUhiWHG2Z/tcQd4PER6tla5fJi10NVq57q45h7fn8n0AtQHQEHyIM5rt9tithaVNqLZC7kE2VtApNvECP/U8jVbbja27TX5SSviXdQr1ajgG4VmYqDuuFJNja+6JLUZTSRbT4hqak3le6wbdXtnjj/8AZYeS0h/ZMjE9sdrA2p4mqw55KPzLJKaNrci36+cHrylWyXudOXi67F9uP0im1OvWrNicS+Z3sWPhuzABbnKAALAaD/Msxpq843PFlPdybqNMqY7YjjIyYZoxmi5NKQpMSNgTFZYgvGkwvGkyBsjKhsQetvf/ANfOOwr6kcb2+QP6mMr02KnKL8uHtKuFrWqeIZWJ1HXcT62HtLYLgw32Ymkvk6fZ2IpIWL03dkyNTtbJm8WbNfXQWtYGan/yKhmDOSxI+06lEHAhQeNteJNtTMGm8lAhhGe/SKx7s8m9tHbagDujmJzXJFlA0y5V48dbzIwmHaqxLMQD+7ASvbnLeG7xtFAA9l9eJ+cmKRENLCtcd/LNajhUTcAvU7/cyVqhOg95WpBQNWzHoLCXFcnoPlNKK3wRheekCokhcDr8oxqt+FpJHI23pGsL/v8AzDvDGGr1hkbANI79YhqDnGlxzkZGwetRwMaIomw8ISAx6SB6luI9TaZu2a7tRqU6dVaTujKrhSxQkWzWNgSJANmVtj4l7Nw5Ze+NZ1uCtFS4uN4zmyexnEbd+NNRlyYLDd2zaB6pFRhf8NNRa/mSOhnJ43sXi6LjukFYKQVYd3Y2sRmR23dNRGU+zm0BUWqlBqbpYqymmpDKbq2YNfNe3i48ZOBUzAxtKqS1XEFxUqEP9YGD1M5JLnNrbTfxlDvAJ1Y7C7SrNmqJYne1WopJ8ypYmb+E+E1cp4qiA7zlpM/szMv5Sc4G4POGxhYZGJyg3tc2B523Xld0trrY7us9If4WVwxHfUwOocH1H/cuH4Y1HChsUoCgDwozEAcBdxaDZKZzuwq4CBDvyhh1B/7molS01cV2ArU0RqLrVanYZLZGZbWNmLWv0Nv85ON2Zi6ZA+iV2P8ADTdwOpZQRObOuTlnB7PS6uhVKLmuBc9onefvz0P76yj3jAkNcMDYqRZh0IOoPnJEfSUvg6VbjLosPUkd40mJmlTNaxgfeGaNBhAOB940yXDYd6jZKatUbkoLHzsBu6zrdi9hnbxYlu6H4Fylz5tqq+QufKWQg5dGS/WVUL6mcYdI+hh3qf6aO/8AwVm/8Qec9bwXZzCUrFKKXG5mu7a79XJM00pKBYCwHACwHkJctP8ALOTZ51L7I/08owvZLF1Vv3fdgbs90a+vAi/6deEt0uw+K45D5tYfIGenZekQUzLPQiYX5i7dlJHlmO7N4mibmnnGlmpXqA6biAMw47wBOU2xTyVCGGVtDY6HdyOs+gDTmH2o7MU8almGSov2KlgSOjD7ynl7Q9D4LI+YlJbZpfs8mwWKDLe+t/nLdOpeU9r7DrYGpkqJbNuZdUqDmp5jkdRy11TC17yqUWjsafUxsj+TSkvfHdw5bh685WDSYESDS+S/SrBen75cJL9KPO/nM2lUA1Iv+UdVxTN08o27AnpZZotigN9pG+0AN0y7n96xpHOQ7GOtOi5U2iZA2NYiQERLRNzLVTFewr1ieMZm6mKYhkclmxHtjY9Ruufl+cjOPY7rD5whOwfLMkRqE74xqd98IQAjOFHKC4ZfOLCQSidKrLooVfIa+5vELMd5JiwkEgqdJKlMcoQkDIkOHEiagRuMISGOngobS2NRxAtXpJUtuJFmW/4XHiX0M5nGfDekSTSxFSl0YLVUdBeze5MIRHBPs1V6iyH2yaKFf4d4gDwYik55Or0tPMZ9fSLhPh9iS1qlWii3NyhqObW0IBRQTewsSP0hCVOqHwa15PU4xuNvB/D3Drq9arU6eBQfZb/OaeH7G4JNe6zH+Nncf0scvyiwjquPwUy1l8u5v+mvQwqIMqBUUcEAUew0k2QQhGwjM5N9hlEUAQhBEADAwhJAQxDEhIIRV2ps6niKZo1lzK3uDwZTwI5zx3tL2ar4Kpf7dMnwVAPC38L/AIX6cd46EIskma9LdKM0kynQxYYdRvHKXFa8ITJNYZ6/TTc4JscPOSLEhKzYkKYw/v8AfCEIEiH96xpHT9YQkDCGNNunuYQkjI//2Q==', tags: ['Artigos', 'Ansiedade', 'Estudo'] },
    { type: 'Vídeo', title: 'Mindfulness para iniciantes', titleOverlay: 'Mindfulness', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSopIJhxZ3dBmlYwkhWlb-IDMK_tBy6oAH6_g&s', tags: ['Vídeos', 'Sono'] },
    { type: 'Curso', title: 'Construindo hábitos positivos', titleOverlay: 'Hábitos', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSopIJhxZ3dBmlYwkhWlb-IDMK_tBy6oAH6_g&s', tags: ['Cursos', 'Estudo'] },
    { type: 'Podcast', title: 'Conversas sobre estoicismo', titleOverlay: 'Estoicismo', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSopIJhxZ3dBmlYwkhWlb-IDMK_tBy6oAH6_g&s', tags: ['Podcast', 'Palestras'] }
  ];

  motivationContent: MotivationContent[] = [
    { icon: 'ri-lightbulb-flash-line', text: 'Pensamento Positivo' },
    { icon: 'ri-plant-line', text: 'Crescimento Pessoal' },
    { icon: 'ri-sun-line', text: 'Energia Diária' }
  ];

  filteredLearningContent: LearningContent[] = [];

  constructor() { }

  ngOnInit(): void {
    this.filterContent();
  }

  // --- Lógica de Filtragem  ---

  /**
   * Adiciona ou remove um filtro da lista de filtros ativos.
   * @param category A categoria a ser adicionada/removida.
   */
  toggleFilter(category: string): void {
    if (this.activeFilters.has(category)) {
      this.activeFilters.delete(category);
    } else {
      this.activeFilters.add(category);
    }
    this.filterContent();
  }

  /**
   * Verifica se um filtro está ativo.
   * @param category A categoria a ser verificada.
   * @returns Verdadeiro se o filtro estiver ativo.
   */
  isActiveFilter(category: string): boolean {
    return this.activeFilters.has(category);
  }

  /**
   * Limpa todos os filtros ativos e a pesquisa.
   */
  clearFilters(): void {
    this.activeFilters.clear();
    this.searchTerm = '';
    this.filterContent();
  }

  /**
   * Filtra o conteúdo com base nos filtros ativos e no termo de pesquisa.
   */
  filterContent(): void {
    let tempContent = this.allLearningContent;
    const searchLower = this.searchTerm.toLowerCase();

    // Filtra por termo de pesquisa
    if (searchLower) {
      tempContent = tempContent.filter(item => 
        item.title.toLowerCase().includes(searchLower) ||
        item.titleOverlay.toLowerCase().includes(searchLower)
      );
    }

    // Filtra por categorias ativas (tags)
    if (this.activeFilters.size > 0) {
      tempContent = tempContent.filter(item => 
        Array.from(this.activeFilters).every(filter => item.tags.includes(filter))
      );
    }
    
    this.filteredLearningContent = tempContent;
  }

  /**
   * Retorna os filtros ativos como uma string para exibição.
   * @returns Uma string com os filtros ativos, separados por vírgula.
   */
  getActiveFiltersText(): string {
    return Array.from(this.activeFilters).join(', ');
  }
}
