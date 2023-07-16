import { NativeModules, Platform } from 'react-native';
import type { Options, ResizeFormat, Response } from './types';
export type { ResizeFormat, ResizeMode, Response } from './types';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const ImageResizer = isTurboModuleEnabled
  ? require('./NativeImageResizer').default
  : NativeModules.ImageResizer;

const defaultOptions: Options = {
  mode: 'contain',
  onlyScaleDown: false,
};

function createResizedImage(
  uri: string,
  width: number,
  height: number,
  format: ResizeFormat,
  quality: number,
  rotation: number = 0,
  flip: '' | 'vertical' | 'horizontal' = '',
  outputPath: string = '',
  keepMeta = false,
  options: Options = defaultOptions
): Promise<Response> {
  const { mode, onlyScaleDown } = { ...defaultOptions, ...options };
  let url = Platform.OS === 'ios' ? uri : uri?.replace('file://', '')

  return ImageResizer.createResizedImage(
    url,
    width,
    height,
    format,
    quality,
    mode,
    onlyScaleDown,
    rotation,
    flip,
    outputPath,
    keepMeta
  );
}

export default {
  createResizedImage,
};
